import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";

const photos: { src: string; alt: string }[] = [
  { src: "/images/teren_1.jpg", alt: "Górne Podjuchy — drzewa i ścieżka o zachodzie słońca" },
  { src: "/images/teren_2.jpg", alt: "Górne Podjuchy — łąka i drzewa pod błękitnym niebem" },
  { src: "/images/teren_3.jpg", alt: "Górne Podjuchy — samotne drzewo na łące" },
  { src: "/images/teren_4.jpg", alt: "Górne Podjuchy — widok nieba przez korony drzew" },
  { src: "/images/teren_5.jpg", alt: "Górne Podjuchy — kwitnący bez i drzewa" },
];

const INITIAL_COUNT = 3;
const STEP = 9; // trzy kolejne rzędy po 3 zdjęcia

const PhotosSection = () => {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const [openAlt, setOpenAlt] = useState("");

  useEffect(() => {
    if (!openSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSrc(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openSrc]);

  const shown = photos.slice(0, visible);
  const hasMore = visible < photos.length;

  const openIdx = openSrc ? photos.findIndex((p) => p.src === openSrc) : -1;
  const goRel = (delta: number) => {
    if (openIdx < 0) return;
    const n = (openIdx + delta + photos.length) % photos.length;
    setOpenSrc(photos[n].src);
    setOpenAlt(photos[n].alt);
  };

  return (
    <section className="px-4 py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Zdjęcia terenu
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Zobacz, jak wygląda obszar górnej części Podjuch zagrożony osiedlem TBS.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((p) => (
            <button
              key={p.src}
              type="button"
              onClick={() => { setOpenSrc(p.src); setOpenAlt(p.alt); }}
              className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted cursor-zoom-in group"
              aria-label={`Powiększ: ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={() => setVisible((v) => Math.min(v + STEP, photos.length))}
              className="inline-flex flex-col items-center gap-1 px-6 py-3 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold transition-colors"
            >
              <span>Pokaż więcej</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        )}
      </div>

      {openSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpenSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpenSrc(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center transition-colors shadow-lg z-10"
            aria-label="Zamknij"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goRel(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center transition-colors shadow-lg z-10"
            aria-label="Poprzednie zdjęcie"
          >
            <span className="text-2xl leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goRel(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center transition-colors shadow-lg z-10"
            aria-label="Następne zdjęcie"
          >
            <span className="text-2xl leading-none">›</span>
          </button>
          <img
            src={openSrc}
            alt={openAlt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};

export default PhotosSection;
