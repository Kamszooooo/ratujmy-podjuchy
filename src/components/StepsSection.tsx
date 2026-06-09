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
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Uwagi do planu ogólnego
          </h2>
        </div>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-3 max-w-2xl mx-auto">
          Złożyliśmy około{" "}
          <span className="font-serif italic font-extrabold text-foreground text-xl md:text-2xl underline decoration-foreground/30 decoration-2 underline-offset-4 mx-1">
            tysiąca
          </span>{" "}
          uwag!
        </p>
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform hover:scale-105 self-start"
              >
                <Download className="w-5 h-5" />
                Pobierz szkic
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold uppercase tracking-wide">
            Walczymy dalej!
          </span>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
