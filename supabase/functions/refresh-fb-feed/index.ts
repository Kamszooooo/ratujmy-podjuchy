// Refreshes the cached Facebook page feed by scraping the public profile.
// Called by pg_cron every 30 minutes (and can be invoked manually).
//
// IMPORTANT: Facebook actively blocks scraping. This is best-effort:
// - It tries mbasic.facebook.com (lightweight HTML) first, then m.facebook.com.
// - When FB returns a login wall / checkpoint / empty page, the function logs
//   the reason and exits without touching the cache (old posts stay visible).
// - If scraping stops working reliably, swap this function for the Graph API
//   version or a manual admin panel — the rest of the pipeline stays the same.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Public profile of "Ratujmy Podjuchy"
const PAGE_ID = "61574321447466";
const PAGE_SLUG = "Ratujmy-Podjuchy";

const UA =
  "Mozilla/5.0 (Linux; Android 10; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

type ScrapedPost = {
  id: string;
  message: string | null;
  created_time: string;
  permalink_url: string | null;
  image_url: string | null;
};

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function stripTags(html: string): string {
  return decodeHtml(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchPage(url: string): Promise<{ ok: boolean; html: string; status: number; finalUrl: string }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "pl-PL,pl;q=0.9,en;q=0.8",
    },
    redirect: "follow",
  });
  const html = await res.text();
  return { ok: res.ok, html, status: res.status, finalUrl: res.url };
}

function looksBlocked(html: string, finalUrl: string): string | null {
  const lower = html.toLowerCase();
  if (finalUrl.includes("/login") || finalUrl.includes("login.php") || finalUrl.includes("checkpoint")) {
    return `redirected to login (${finalUrl})`;
  }
  if (lower.includes("you must log in") || lower.includes("musisz się zalogować") || lower.includes("zaloguj się")) {
    return "page requires login";
  }
  if (lower.includes("captcha") || lower.includes("security check")) {
    return "captcha / security check";
  }
  if (html.length < 500) {
    return `response too short (${html.length} bytes)`;
  }
  return null;
}

function parsePosts(html: string): ScrapedPost[] {
  const posts: ScrapedPost[] = [];

  // mbasic / m.facebook.com renders each post inside an <article> with data-ft JSON
  // containing the post id (top_level_post_id / mf_story_key).
  const articleRe = /<article\b([^>]*)>([\s\S]*?)<\/article>/gi;
  let m: RegExpExecArray | null;
  while ((m = articleRe.exec(html)) !== null) {
    const attrs = m[1];
    const body = m[2];

    const dataFtMatch = attrs.match(/data-ft="([^"]+)"/);
    let postId: string | null = null;
    if (dataFtMatch) {
      try {
        const ft = JSON.parse(decodeHtml(dataFtMatch[1]));
        postId = ft.top_level_post_id || ft.mf_story_key || null;
      } catch {
        // ignore parse errors
      }
    }
    if (!postId) {
      const idAttr = attrs.match(/id="u_[^"]*?_(\d+)"/);
      if (idAttr) postId = idAttr[1];
    }
    if (!postId) continue;

    // Story body: largest text block in the article. mbasic wraps it in a <p> chain.
    const textBlocks = Array.from(body.matchAll(/<p>([\s\S]*?)<\/p>/gi)).map((x) => stripTags(x[1]));
    const message = textBlocks.length ? textBlocks.join("\n\n").trim() : stripTags(body).slice(0, 2000);

    // Permalink: look for /story.php?story_fbid=...&id=... or /<page>/posts/<id>
    let permalink: string | null = null;
    const story = body.match(/href="(\/story\.php\?story_fbid=[^"]+)"/);
    if (story) {
      permalink = "https://www.facebook.com" + decodeHtml(story[1]).replace(/&amp;/g, "&");
    } else {
      const posts1 = body.match(/href="(\/[^"\/]+\/posts\/[^"]+)"/);
      if (posts1) permalink = "https://www.facebook.com" + decodeHtml(posts1[1]);
    }
    if (!permalink) {
      permalink = `https://www.facebook.com/${PAGE_ID}/posts/${postId}`;
    }

    // Image: first <img> with src pointing to fb CDN
    let imageUrl: string | null = null;
    const img = body.match(/<img[^>]+src="(https:\/\/[^"]*?(?:fbcdn|scontent)[^"]+)"/);
    if (img) imageUrl = decodeHtml(img[1]);

    // Timestamp: mbasic exposes "abbr" with the post time, often as text like "23 czerwca o 14:35".
    // We cannot recover an exact ISO timestamp from text reliably, so fall back to "now - index minutes"
    // ordering is enough for display. The DB has created_time NOT NULL so we need something.
    // Prefer data-utime if present (older layouts).
    let createdIso: string | null = null;
    const utime = body.match(/data-utime="(\d+)"/);
    if (utime) {
      createdIso = new Date(parseInt(utime[1], 10) * 1000).toISOString();
    }

    posts.push({
      id: postId,
      message: message || null,
      created_time: createdIso ?? new Date(Date.now() - posts.length * 60_000).toISOString(),
      permalink_url: permalink,
      image_url: imageUrl,
    });
  }

  return posts;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const candidates = [
    `https://mbasic.facebook.com/profile.php?id=${PAGE_ID}&v=timeline`,
    `https://mbasic.facebook.com/${PAGE_SLUG}-${PAGE_ID}/`,
    `https://m.facebook.com/profile.php?id=${PAGE_ID}&v=timeline`,
  ];

  const attempts: Array<{ url: string; status: number; reason?: string; postsFound?: number }> = [];
  let scraped: ScrapedPost[] = [];

  for (const url of candidates) {
    try {
      const { html, status, finalUrl } = await fetchPage(url);
      const blocked = looksBlocked(html, finalUrl);
      if (blocked) {
        attempts.push({ url, status, reason: blocked });
        continue;
      }
      const parsed = parsePosts(html);
      attempts.push({ url, status, postsFound: parsed.length });
      if (parsed.length > 0) {
        scraped = parsed.slice(0, 15);
        break;
      }
    } catch (e) {
      attempts.push({ url, status: 0, reason: `fetch error: ${String(e)}` });
    }
  }

  if (scraped.length === 0) {
    console.warn("refresh-fb-feed: no posts scraped", JSON.stringify(attempts));
    return new Response(
      JSON.stringify({ ok: false, error: "no_posts_scraped", attempts }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const rows = scraped.map((p) => ({
    ...p,
    fetched_at: new Date().toISOString(),
  }));

  const { error: upsertError } = await supabase
    .from("fb_posts")
    .upsert(rows, { onConflict: "id" });

  if (upsertError) {
    console.error("Upsert error:", upsertError);
    return new Response(
      JSON.stringify({ error: "db_upsert_error", details: upsertError.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  // Trim cache: keep only the newest 30 rows
  const { data: keep } = await supabase
    .from("fb_posts")
    .select("id")
    .order("created_time", { ascending: false })
    .limit(30);

  const keepIds = (keep ?? []).map((r) => r.id);
  if (keepIds.length > 0) {
    await supabase
      .from("fb_posts")
      .delete()
      .not("id", "in", `(${keepIds.map((i) => `"${i}"`).join(",")})`);
  }

  return new Response(
    JSON.stringify({ ok: true, fetched: scraped.length, attempts }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
