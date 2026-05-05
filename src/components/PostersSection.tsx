import { Download } from "lucide-react";

const posters = [
  { src: "/files/plakat_1.png", title: "Plakat informacyjny — spotkanie 16 maja", filename: "plakat-nie-dla-tbs-spotkanie.png" },
  { src: "/files/plakat_2.png", title: "Plakat — mieszkańcy sprzeciwiają się od 25 lat", filename: "plakat-mieszkancy-sprzeciw.png" },
  { src: "/files/plakat_3.png", title: "Plakat — NIE dla TBS / TAK dla zabudowy jednorodzinnej", filename: "plakat-nie-tbs-tak-jednorodzinna.png" },
];

const PostersSection = () => {
  return (
    <section className="px-4 py-16 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Plakaty do pobrania
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pobierz, wydrukuj i&nbsp;rozwieś w&nbsp;swojej okolicy. Pomóż nam dotrzeć do jak największej liczby mieszkańców!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map((p) => (
            <div key={p.src} className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="aspect-[3/4] bg-muted overflow-hidden flex items-center justify-center">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
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
    </section>
  );
};

export default PostersSection;
