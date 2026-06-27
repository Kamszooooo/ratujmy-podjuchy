// Refreshes the cached Facebook page feed.
// Called by pg_cron every 30 minutes (and can be invoked manually).
// Requires FACEBOOK_PAGE_ACCESS_TOKEN (long-lived Page Access Token).
// Token expires every ~60 days — regenerate via Meta Graph API Explorer.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const token = Deno.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
  if (!token) {
    return new Response(
      JSON.stringify({ error: "FACEBOOK_PAGE_ACCESS_TOKEN is not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const url = new URL("https://graph.facebook.com/v21.0/me/posts");
    url.searchParams.set(
      "fields",
      "id,message,created_time,permalink_url,full_picture",
    );
    url.searchParams.set("limit", "15");
    url.searchParams.set("access_token", token);

    const res = await fetch(url.toString());
    const json = await res.json();

    if (!res.ok) {
      console.error("Facebook API error:", json);
      return new Response(
        JSON.stringify({ error: "facebook_api_error", details: json }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const posts = (json.data ?? []) as Array<{
      id: string;
      message?: string;
      created_time: string;
      permalink_url?: string;
      full_picture?: string;
    }>;

    if (posts.length > 0) {
      const rows = posts.map((p) => ({
        id: p.id,
        message: p.message ?? null,
        created_time: p.created_time,
        permalink_url: p.permalink_url ?? null,
        image_url: p.full_picture ?? null,
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

      // Trim cache: keep only newest 30
      const { data: keep } = await supabase
        .from("fb_posts")
        .select("id")
        .order("created_time", { ascending: false })
        .limit(30);

      const keepIds = (keep ?? []).map((r) => r.id);
      if (keepIds.length > 0) {
        await supabase.from("fb_posts").delete().not("id", "in", `(${keepIds.map((i) => `"${i}"`).join(",")})`);
      }
    }

    return new Response(
      JSON.stringify({ ok: true, fetched: posts.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("refresh-fb-feed error:", e);
    return new Response(
      JSON.stringify({ error: "internal_error", details: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
