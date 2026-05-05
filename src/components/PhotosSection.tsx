import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const photos: { src: string; alt: string }[] = [
  { src: "/images/teren_1.jpg", alt: "Górne Podjuchy — drzewa i ścieżka o zachodzie słońca" },
  { src: "/images/teren_2.jpg", alt: "Górne Podjuchy — łąka i drzewa pod błękitnym niebem" },
  { src: "/images/teren_3.jpg", alt: "Górne Podjuchy — samotne drzewo na łące" },
  { src: "/images/teren_4.jpg", alt: "Górne Podjuchy — widok nieba przez korony drzew" },
  { src: "/images/teren_5.jpg", alt: "Górne Podjuchy — kwitnący bez i drzewa" },
];

const PhotosSection = () => {
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

  return (
    <section className="px-4 py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Zdjęcia terenu
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Zobacz, jak wygląda obszar Górnych Podjuch zagrożony zabudową wielorodzinną.
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="px-8 sm:px-12">
          <CarouselContent>
            {photos.map((p) => (
              <CarouselItem key={p.src} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <button
                  type="button"
                  onClick={() => { setOpenSrc(p.src); setOpenAlt(p.alt); }}
                  className="block w-full aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted cursor-zoom-in group"
                  aria-label={`Powiększ: ${p.alt}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-6 h-6" />
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
