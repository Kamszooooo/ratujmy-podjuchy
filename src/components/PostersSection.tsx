import { Download, X } from "lucide-react";
import { useState, useEffect } from "react";

const posters = [
  { src: "/files/plakat_1.png", title: "Plakat informacyjny — spotkanie 16 maja", filename: "plakat-nie-dla-tbs-spotkanie.png" },
  { src: "/files/plakat_2.png", title: "Plakat — mieszkańcy sprzeciwiają się od 25 lat", filename: "plakat-mieszkancy-sprzeciw.png" },
  { src: "/files/plakat_3.png", title: "Plakat — NIE dla TBS / TAK dla zabudowy jednorodzinnej", filename: "plakat-nie-tbs-tak-jednorodzinna.png" },
];

const PostersSection = () => {
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const [openAlt, setOpenAlt] = useState<string>("");

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
    <section className="px-4 py-16 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Plakaty do pobrania
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pobierz, wydrukuj i&nbsp;rozwieś w&nbsp;swojej okolicy!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map((p) => (
            <div key={p.src} className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <button
                type="button"
                onClick={() => { setOpenSrc(p.src); setOpenAlt(p.title); }}
                className="aspect-[3/4] bg-muted overflow-hidden flex items-center justify-center cursor-zoom-in group"
                aria-label={`Powiększ: ${p.title}`}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </button>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold text-foreground mb-4 flex-1">{p.title}</h3>
                <a
                  href={p.src}
                  download={p.filename}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  Pobierz plakat
                </a>
              </div>
            </div>
          ))}
        </div>
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

export default PostersSection;
