import { AlertTriangle, ZoomIn, ChevronDown } from "lucide-react";
import uwagaNieuwzgledniona from "@/assets/uwaga-nieuwzgledniona.png.asset.json";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const CityResponseSection = () => {
  return (
    <section id="city-reply" className="px-4 bg-background pt-[60px] pb-0">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-6 md:p-10 border-2 border-destructive/60 bg-destructive/5 shadow-xl shadow-destructive/10">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-widest">
              <AlertTriangle className="w-3.5 h-3.5" />
              Plan ogólny przyjęty
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-foreground mb-6">
            Prezydent i radni{" "}
            <span className="text-destructive underline decoration-destructive/60 decoration-4 underline-offset-4">
              całkowicie zignorowali głos mieszkańców
            </span>{" "}
            w sprawie TBS-ów.
          </h2>

          <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
            Na nic się zdało <strong>1971 podpisów</strong> pod petycją i <strong>734 uwagi</strong> złożone do projektu planu. Nasze uwagi mają oficjalny status <strong>całkowicie nieuwzględnionych</strong>. Cały obszar między ul. Wschodnią, Olkuską, Sąsiedzką i autostradą został przewidziany w planie ogólnym pod strefę z zabudową wielorodzinną (1386SW).
          </p>

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

          <Dialog>
            <DialogTrigger asChild>
              <figure className="group relative rounded-xl overflow-hidden border-2 border-destructive/30 bg-background shadow-md cursor-zoom-in transition-transform hover:scale-[1.01]">
                <img
                  src={uwagaNieuwzgledniona.url}
                  alt="Fragment projektu uchwały: Uwaga nieuwzględniona. Zachowuje się strefę SW – strefa wielofunkcyjna z zabudową mieszkaniową wielorodzinną."
                  className="w-full h-auto block"
                />
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-semibold text-foreground border border-border shadow-sm opacity-90 group-hover:opacity-100">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Powiększ
                </div>
              </figure>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogTitle className="sr-only">Uwaga nieuwzględniona</DialogTitle>
              <DialogDescription className="sr-only">
                Pełna treść odpowiedzi władz miasta na uwagę dotyczącą terenu TBS-ów.
              </DialogDescription>
              <div className="text-base md:text-lg text-foreground leading-relaxed">
                <p>
                  „<span className="font-bold">Uwaga nieuwzględniona.</span> Zachowuje się strefę SW – strefa wielofunkcyjna z zabudową mieszkaniową wielorodzinną. STBS na przedmiotowym terenie od 2005r. planuje realizację potrzeb mieszkaniowych miasta w ramach prowadzenia statutowej dzielności niekomercyjnego mieszkalnictwa społecznego. STBS planuje kontynuować proces budowlany w partnerstwie z Miastem w formule Zintegrowanego Planu inwestycyjnego (ZPI), który jest szczególną formą planu miejscowego — pozwalającego na przeprowadzenie wszelkich niezbędnych uzgodnień i konsultacji społecznych oraz wypracowania funkcji i docelowych parametrów zabudowy mieszczących się w przedziałach wskazanych w planie ogólnym.”
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-8 p-5 md:p-6 rounded-2xl bg-destructive text-destructive-foreground">
            <p className="text-lg md:text-2xl font-extrabold leading-snug text-center">
              Nie odpuszczamy. Bloki na górkach jeszcze nie są przesądzone!
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center pt-10 pb-2 text-muted-foreground">
          <p className="text-sm md:text-base font-semibold uppercase tracking-widest mb-2">
            Przegrana bitwa to nie przegrana wojna
          </p>
          <ChevronDown className="w-6 h-6 animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default CityResponseSection;
