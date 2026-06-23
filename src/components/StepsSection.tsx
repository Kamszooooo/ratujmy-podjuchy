import { Download } from "lucide-react";

const drafts = [
  {
    title: "Teren między ul. Sąsiedzką a ul. Wschodnią (TBS-y)",
    description: "Sprzeciw wobec strefy zabudowy wielorodzinnej, obejmującej planowane osiedle TBS i miejską działkę między ul. Ukośną a ul. Olkuską.",
    href: "/files/Szkic_uwagi.pdf",
  },
  {
    title: "Teren za autostradą A6",
    description: "Nasza dodatkowa inicjatywa: sprzeciw wobec strefy ze składowiskami i magazynami, którą miasto przewiduje na terenach za autostradą A6. Proponujemy strefę z usługami sportu i rekreacji!",
    href: "/files/Szkic_uwagi_za_autostrada.pdf",
  },
];

const StepsSection = () => {
  return (
    <section className="px-4 bg-card py-[40px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Szkice uwag
          </h2>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-10 max-w-3xl mx-auto md:text-xs md:whitespace-nowrap">
          A w 2019 r. w ankiecie rady osiedla 99% z 474 badanych mieszkańców sprzeciwiło się zabudowie wielorodzinnej.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {drafts.map((d) => (
            <div
              key={d.href}
              className="bg-muted/50 rounded-2xl p-6 border border-border flex flex-col"
            >
              <h3 className="text-base font-bold text-muted-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1">{d.description}</p>
              <a
                href={d.href}
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-primary text-primary font-semibold transition-transform hover:scale-105 self-start"
              >
                <Download className="w-5 h-5" />
                Pobierz szkic
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
