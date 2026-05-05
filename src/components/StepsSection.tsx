import { Download } from "lucide-react";

const drafts = [
  {
    title: "Teren między ul. Sąsiedzką a ul. Wschodnią (TBS-y)",
    description: "Sprzeciw wobec strefy zabudowy wielorodzinnej, obejmującej planowane osiedle TBS i miejską działkę między ul. Ukośną a ul. Olkuską.",
    href: "/files/Szkic_uwagi.docx",
  },
  {
    title: "Teren za autostradą A6",
    description: "Sprzeciw wobec strefy ze składowiskami i magazynami. Proponujemy strefę z usługami sportu i rekreacji!",
    href: "/files/Szkic_uwagi_za_autostrada.docx",
  },
];

const StepsSection = () => {
  return (
    <section className="px-4 bg-card py-[40px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold uppercase tracking-wide mb-3">
            Czas konsultacji minął, ale walczymy dalej!
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Uwagi do planu ogólnego
          </h2>
        </div>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Złożyliśmy około tysiąca uwag. Poniżej można je pobrać do wykorzystania w&nbsp;dalszych działaniach.
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
                Pobierz szkic (DOCX)
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
