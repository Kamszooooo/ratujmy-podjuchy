import { AlertTriangle } from "lucide-react";
import uwagaNieuwzgledniona from "@/assets/uwaga-nieuwzgledniona.png.asset.json";

const CityResponseSection = () => {
  return (
    <section className="px-4 bg-background py-[40px]">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl p-6 border border-destructive/40 bg-destructive/5">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-destructive/15 text-destructive shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <p className="text-sm md:text-base text-foreground/90 leading-snug">
              Władze miasta planują całkowicie zignorować głos mieszkańców w sprawie TBS-ów (
              <a
                href="https://cdn.um.szczecin.pl/httpfiles/projekt_133.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-destructive decoration-2 underline-offset-2 font-semibold text-destructive hover:opacity-80"
              >
                projekt uchwały w sprawie planu ogólnego
              </a>
              , s. 112):
            </p>
          </div>
          <figure className="rounded-xl overflow-hidden border border-border bg-background">
            <img
              src={uwagaNieuwzgledniona.url}
              alt="Fragment projektu uchwały: Uwaga nieuwzględniona. Zachowuje się strefę SW – strefa wielofunkcyjna z zabudową mieszkaniową wielorodzinną."
              className="w-full h-auto block"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default CityResponseSection;
