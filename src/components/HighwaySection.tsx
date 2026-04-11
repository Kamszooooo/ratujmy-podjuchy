import { Download, Construction } from "lucide-react";

const HighwaySection = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Construction className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-foreground">
            A&nbsp;co z&nbsp;terenem za&nbsp;autostradą?
          </h3>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed mb-5">
          <p>
            Kontrowersje wzbudza także przeznaczenie terenów za autostradą A6. Projekt planu przewiduje strefę usługową, dopuszczającą między innymi lokalizowanie składowisk i&nbsp;magazynów. W&nbsp;odniesieniu do tego terenu też przygotowałem uwagę, aby stał się on strefą zieleni i&nbsp;rekreacji z&nbsp;usługami sportu.
          </p>
        </div>

        <a
          href="/files/Szkic_uwagi_autostrada.docx"
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-transform hover:scale-105"
        >
          <Download className="w-4 h-4" />
          Pobierz szkic uwagi do terenu za autostradą (DOCX)
        </a>
      </div>
    </section>
  );
};

export default HighwaySection;
