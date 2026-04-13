import { Download } from "lucide-react";

const HighwaySection = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">
          A&nbsp;co z&nbsp;terenem za&nbsp;autostradą?
        </h3>

        <div className="prose prose-base max-w-none text-muted-foreground leading-relaxed mb-5">
          <p>
            Kontrowersje wzbudza także planowane przeznaczenie terenów za autostradą A6. Projekt planu przewiduje strefę usługową i&nbsp;dopuszcza tam między innymi składowiska i&nbsp;magazyny. W&nbsp;odniesieniu do tego terenu też przygotowałem uwagę, tak aby był on przeznaczony pod strefą zieleni z&nbsp;usługami sportu i&nbsp;rekreacji.
          </p>
        </div>

        <a
          href="/files/Szkic_uwagi_za_autostrada.docx"
          download
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-muted-foreground text-xs font-medium transition-colors hover:text-foreground hover:border-foreground/30"
        >
          <Download className="w-3.5 h-3.5" />
          Pobierz szkic uwagi do terenu za autostradą (DOCX)
        </a>
      </div>
    </section>
  );
};

export default HighwaySection;
