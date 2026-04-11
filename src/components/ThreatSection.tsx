import { AlertTriangle } from "lucide-react";

const ThreatSection = () => {
  return (
    <section id="co-nam-grozi" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Co nam grozi?</h2>
        </div>

        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
          <p>
            Władze Szczeciina chcą budowy bloków wielorodzinnych w górnej części Podjuch, na terenie między ul. Sąsiedzką a Wschodnią. Szczecińskie TBS ogłosiło nawet niedawno wyniki konkursu architektonicznego na zabudowę większości tego obszaru.
          </p>
          <p>
            To absurdalny pomysł! Ta część Podjuch ma w przeważającej mierze charakter jednorodzinny. Teren jest cenny przyrodniczo - pagórkowaty i częściowo lesisty. Do 20 kwietnia 2026 r. trwają konsultację planu ogólnego Miasta Szczecin - możemy jeszcze uratować Podjuchy!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThreatSection;
