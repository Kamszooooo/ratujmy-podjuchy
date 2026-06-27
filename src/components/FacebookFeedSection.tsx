import { useEffect, useState } from "react";
import { Facebook, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type FbPost = {
  id: string;
  message: string | null;
  created_time: string;
  permalink_url: string | null;
  image_url: string | null;
};

const PAGE_URL = "https://www.facebook.com/people/Ratujmy-Podjuchy/61574321447466/";
const MAX_CHARS = 280;

function formatRelative(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.round(diffMs / 60000);
  const hours = Math.round(diffMs / 3600000);
  const days = Math.round(diffMs / 86400000);

  if (minutes < 1) return "przed chwilą";
  if (minutes < 60) return `${minutes} min temu`;
  if (hours < 24) return `${hours} godz. temu`;
  if (days < 7) return `${days} ${days === 1 ? "dzień" : "dni"} temu`;
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function truncate(text: string): { shown: string; truncated: boolean } {
  if (text.length <= MAX_CHARS) return { shown: text, truncated: false };
  const cut = text.slice(0, MAX_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  return { shown: cut.slice(0, lastSpace > 200 ? lastSpace : MAX_CHARS) + "…", truncated: true };
}

const FacebookFeedSection = () => {
  const [posts, setPosts] = useState<FbPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("fb_posts")
        .select("id, message, created_time, permalink_url, image_url")
        .order("created_time", { ascending: false })
        .limit(9);
      if (cancelled) return;
      if (error) {
        setError(true);
        setLoading(false);
        return;
      }
      const list = (data ?? []) as FbPost[];
      // resolve storage paths into signed URLs
      const resolved = await Promise.all(
        list.map(async (p) => {
          if (!p.image_url) return p;
          if (/^https?:\/\//i.test(p.image_url)) return p;
          const { data: signed } = await supabase.storage
            .from("fb-post-images")
            .createSignedUrl(p.image_url, 3600);
          return { ...p, image_url: signed?.signedUrl ?? null };
        }),
      );
      if (cancelled) return;
      setPosts(resolved);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasPosts = posts && posts.length > 0;

  return (
    <section className="px-4 py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide mb-4">
            <Facebook className="w-3.5 h-3.5" />
            Aktualności
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Posty z naszego profilu
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Najnowsze wpisy z profilu „Ratujmy Podjuchy" na Facebooku — bez śledzących wtyczek i&nbsp;ciasteczek Meta.
          </p>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-5 h-64 animate-pulse"
              >
                <div className="h-3 w-24 bg-muted rounded mb-4" />
                <div className="h-3 w-full bg-muted rounded mb-2" />
                <div className="h-3 w-5/6 bg-muted rounded mb-2" />
                <div className="h-3 w-4/6 bg-muted rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && hasPosts && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts!.map((p) => {
              const { shown, truncated } = truncate(p.message ?? "");
              return (
                <article
                  key={p.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {p.image_url && (
                    <a
                      href={p.permalink_url ?? PAGE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-video overflow-hidden bg-muted"
                    >
                      <img
                        src={p.image_url}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </a>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">
                      {formatRelative(p.created_time)}
                    </div>
                    {shown && (
                      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line mb-4 flex-1">
                        {shown}
                        {truncated && p.permalink_url && (
                          <>
                            {" "}
                            <a
                              href={p.permalink_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-medium"
                            >
                              czytaj dalej
                            </a>
                          </>
                        )}
                      </p>
                    )}
                    {p.permalink_url && (
                      <a
                        href={p.permalink_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mt-auto"
                      >
                        Zobacz na Facebooku
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && !hasPosts && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-xl mx-auto">
            <Facebook className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">
              {error
                ? "Nie udało się załadować postów."
                : "Wkrótce pojawią się tutaj najnowsze posty."}
            </p>
            <a
              href={PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Zobacz profil na Facebooku
            </a>
          </div>
        )}

        {!loading && hasPosts && (
          <div className="flex justify-center mt-10">
            <a
              href={PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Wszystkie posty na Facebooku
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacebookFeedSection;
