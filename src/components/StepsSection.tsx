import { Download, FileText, Users, BarChart3 } from "lucide-react";

const drafts = [
  {
    title: "Teren między ul. Sąsiedzką a ul. Wschodnią (TBS-y)",
    description: "Sprzeciw wobec strefy zabudowy wielorodzinnej, obejmującej planowane osiedle TBS i miejską działkę między ul. Ukośną a ul. Olkuską.",
    href: "/files/Szkic_uwagi.pdf",
    count: 734,
    countLabel: "uwagi",
  },
  {
    title: "Teren za autostradą A6",
    description: "Nasza dodatkowa inicjatywa: sprzeciw wobec strefy ze składowiskami i magazynami, którą miasto przewiduje na terenach za autostradą A6. Proponujemy strefę z usługami sportu i rekreacji!",
    href: "/files/Szkic_uwagi_za_autostrada.pdf",
    count: 247,
    countLabel: "uwag",
  },
];

const StepsSection = () => {
  return (
    <section className="px-4 bg-card py-[40px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Złożyliśmy około <span className="italic underline decoration-primary decoration-2 underline-offset-4 font-semibold">tysiąca</span> uwag do planu ogólnego!
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
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
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-border">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary leading-none">
                    {d.count.toLocaleString("pl-PL")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    złożonych uwag
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Petition signatures */}
        <div className="mt-4 rounded-2xl p-6 border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 text-primary shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div className="min-w-0">
            <div className="text-4xl font-extrabold text-primary leading-none">
              1971
            </div>
            <div className="text-sm text-foreground/80 mt-2 leading-snug">
              podpisów pod petycją przeciwko zabudowie wielorodzinnej na górkach
            </div>
          </div>
        </div>

        {/* 99% survey */}
        <div className="mt-4 rounded-2xl p-6 border border-border bg-muted/50 flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                className="stroke-muted"
                strokeWidth="3.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                className="stroke-primary"
                strokeWidth="3.5"
                strokeDasharray="99, 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-extrabold text-primary">99%</span>
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-1">
              <BarChart3 className="w-3.5 h-3.5" />
              Ankieta rady osiedla
            </div>
            <div className="text-sm text-foreground/80 leading-snug">
              z <span className="font-bold text-foreground">474</span> mieszkańców Podjuch sprzeciwiło się zabudowie wielorodzinnej
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
