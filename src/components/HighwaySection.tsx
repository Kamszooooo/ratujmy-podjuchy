import { Download, Construction } from "lucide-react";

const HighwaySection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Construction className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            A&nbsp;co z&nbsp;terenem za&nbsp;autostradą?
          </h2>
        </div>

        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4 mb-8">
          <p>
            Kontrowersje wzbudza także przeznaczenie terenów za autostradą A6. Projekt planu przewiduje strefę usługową, dopuszczającą między innymi lokalizowanie składowisk i&nbsp;magazynów. W&nbsp;odniesieniu do tego terenu też przygotowałem uwagę, aby stał się on strefą zieleni i&nbsp;rekreacji z&nbsp;usługami sportu.
          </p>
        </div>

        <a
          href="/files/Szkic_uwagi_autostrada.docx"
          download
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          Pobierz szkic uwagi do terenu za autostradą (DOCX)
        </a>
      </div>
    </section>
  );
};

export default HighwaySection;
