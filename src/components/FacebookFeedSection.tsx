import { useCallback, useEffect, useState } from "react";
import { Facebook, ExternalLink, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type FbPost = {
  id: string;
  message: string | null;
  created_time: string;
  permalink_url: string | null;
  image_urls: string[]; // resolved URLs
};

const PAGE_URL = "https://www.facebook.com/people/Ratujmy-Podjuchy/61574321447466/";
const MAX_CHARS = 280;
const IMAGE_BUCKET = "fb-post-images";

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
  return date.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
}

function truncate(text: string): { shown: string; truncated: boolean } {
  if (text.length <= MAX_CHARS) return { shown: text, truncated: false };
  const cut = text.slice(0, MAX_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  return { shown: cut.slice(0, lastSpace > 200 ? lastSpace : MAX_CHARS) + "…", truncated: true };
}

async function resolveOne(value: string): Promise<string | null> {
  if (/^https?:\/\//i.test(value)) return value;
  const { data } = await supabase.storage.from(IMAGE_BUCKET).createSignedUrl(value, 3600);
  return data?.signedUrl ?? null;
}

function PostImages({ urls, href }: { urls: string[]; href: string }) {
  const [idx, setIdx] = useState(0);
  if (urls.length === 0) return null;
  const current = urls[idx];
  return (
    <div className="relative bg-muted">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video overflow-hidden"
      >
        <img
          src={current}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </a>
      {urls.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIdx((i) => (i - 1 + urls.length) % urls.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background shadow"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIdx((i) => (i + 1) % urls.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background shadow"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/80 text-xs font-medium">
            <Images className="w-3 h-3" />
            {idx + 1}/{urls.length}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {urls.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIdx(i);
                }}
                aria-label={`Zdjęcie ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-foreground w-4" : "bg-foreground/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function linkify(text: string) {
  const urlRegex = /(https?:\/\/\S+)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[0];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline break-all"
      >
        {url}
      </a>
    );
    lastIndex = match.index + url.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function PostBody({ full, shown, truncated }: { full: string; shown: string; truncated: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const text = (expanded || !truncated ? full : shown).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  return (
    <div className="text-sm text-foreground/90 leading-relaxed mb-4 flex-1">
      {text.split("\n").map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;
        return (
          <p key={i} className="mb-2 last:mb-0">
            {linkify(trimmed)}
          </p>
        );
      })}
      {truncated && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-primary hover:underline font-medium mt-1 inline"
        >
          {expanded ? "zwiń" : "czytaj dalej"}
        </button>
      )}
    </div>
  );
}

const FacebookFeedSection = () => {
  const [posts, setPosts] = useState<FbPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("fb_posts")
        .select("id, message, created_time, permalink_url, image_url, image_urls")
        .order("created_time", { ascending: false })
        .limit(9);
      if (cancelled) return;
      if (error) {
        setError(true);
        setLoading(false);
        return;
      }
      const list = data ?? [];
      const resolved = await Promise.all(
        list.map(async (p) => {
          const raw =
            p.image_urls && p.image_urls.length > 0
              ? p.image_urls
              : p.image_url
                ? [p.image_url]
                : [];
          const urls = (await Promise.all(raw.map(resolveOne))).filter((u): u is string => !!u);
          return {
            id: p.id,
            message: p.message,
            created_time: p.created_time,
            permalink_url: p.permalink_url,
            image_urls: urls,
          } satisfies FbPost;
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
    <section className="px-4 pt-8 pb-16 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Aktualności
          </h2>
          <a
            href={PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium transition-colors"
          >
            <Facebook className="w-4 h-4" />
            Ratujmy Podjuchy na Facebooku
          </a>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 h-64 animate-pulse">
                <div className="h-3 w-24 bg-muted rounded mb-4" />
                <div className="h-3 w-full bg-muted rounded mb-2" />
                <div className="h-3 w-5/6 bg-muted rounded mb-2" />
                <div className="h-3 w-4/6 bg-muted rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && hasPosts && (
          <Carousel
            opts={{
              align: "start",
              loop: posts!.length > 1,
            }}
            plugins={[WheelGesturesPlugin()]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {posts!.map((p) => {
                const full = p.message ?? "";
                const { shown, truncated } = truncate(full);
                return (
                  <CarouselItem
                    key={p.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                      {p.image_urls.length > 0 && (
                        <PostImages urls={p.image_urls} href={p.permalink_url ?? PAGE_URL} />
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">
                          {formatRelative(p.created_time)}
                        </div>
                        {full && <PostBody full={full} shown={shown} truncated={truncated} />}
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
        )}

        {!loading && !hasPosts && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-xl mx-auto">
            <Facebook className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">
              {error ? "Nie udało się załadować postów." : "Wkrótce pojawią się tutaj najnowsze posty."}
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

      </div>
    </section>
  );
};

export default FacebookFeedSection;
