import { AlertTriangle } from "lucide-react";
import uwagaNieuwzgledniona from "@/assets/uwaga-nieuwzgledniona.png.asset.json";

const CityResponseSection = () => {
  return (
    <section className="px-4 bg-background py-[60px]">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-6 md:p-10 border-2 border-destructive/60 bg-destructive/5 shadow-xl shadow-destructive/10">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-widest">
              <AlertTriangle className="w-3.5 h-3.5" />
              Pilne
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-foreground mb-6">
            Władze miasta{" "}
            <span className="text-destructive underline decoration-destructive/60 decoration-4 underline-offset-4">
              planują całkowicie zignorować głos mieszkańców
            </span>{" "}
            w sprawie TBS-ów.
          </h2>

          <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
            Fragment{" "}
            <a
              href="https://cdn.um.szczecin.pl/httpfiles/projekt_133.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-destructive decoration-2 underline-offset-2 font-semibold text-destructive hover:opacity-80"
            >
              projektu uchwały w sprawie planu ogólnego
            </a>{" "}
            (s. 112):
          </p>

          <figure className="rounded-xl overflow-hidden border-2 border-destructive/30 bg-background shadow-md">
            <img
              src={uwagaNieuwzgledniona.url}
              alt="Fragment projektu uchwały: Uwaga nieuwzględniona. Zachowuje się strefę SW – strefa wielofunkcyjna z zabudową mieszkaniową wielorodzinną."
              className="w-full h-auto block"
            />
          </figure>

          <div className="mt-8 p-5 md:p-6 rounded-2xl bg-destructive text-destructive-foreground">
            <p className="text-lg md:text-2xl font-extrabold leading-snug text-center">
              Wzywamy Radę Miasta do skierowania projektu planu ogólnego do dalszych prac i uwzględnienia naszych postulatów!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityResponseSection;
