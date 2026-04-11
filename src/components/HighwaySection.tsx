import { Download, Construction } from "lucide-react";

const HighwaySection = () => {
  return (
    <section className="pb-12 pt-2 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-muted/50 border border-border rounded-xl p-5 md:p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Construction className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 font-sans">
                A&nbsp;co z&nbsp;terenem za&nbsp;autostradą?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Kontrowersje wzbudza także przeznaczenie terenów za autostradą A6. Projekt planu przewiduje strefę usługową i&nbsp;dopuszcza tam między innymi składowiska i&nbsp;magazyny. W&nbsp;odniesieniu do tego terenu też przygotowałem uwagę, tak aby był on przeznaczony pod strefą zieleni z&nbsp;usługami sportu rekreacji.
              </p>
              <a
                href="/files/Szkic_uwagi_autostrada.docx"
                download
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold transition-colors hover:bg-primary/20"
              >
                <Download className="w-3.5 h-3.5" />
                Pobierz szkic uwagi do terenu za autostradą (DOCX)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighwaySection;
