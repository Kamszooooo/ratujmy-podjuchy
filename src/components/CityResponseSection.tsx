import { AlertTriangle, ZoomIn, ChevronDown } from "lucide-react";
import uwagaNieuwzgledniona from "@/assets/uwaga-nieuwzgledniona.png.asset.json";
import gorkiMaksZabudowa from "@/assets/gorki-maks-zabudowa.png.asset.json";
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
            Prezydent i radni zignorowali głos mieszkańców w{"\u00A0"}sprawie TBS-ów.

          </h2>

          <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
            Na nic się zdało <strong>1971 podpisów</strong> pod petycją i <strong>734 uwagi</strong> złożone do projektu planu ogólnego. Nasze uwagi mają oficjalny status <strong className="relative inline-block bg-destructive/25 px-1.5 py-0.5 -rotate-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] rounded-sm">całkowicie nieuwzględnionych</strong>. Cały obszar między ul. Wschodnią, Olkuską, Sąsiedzką i autostradą został przewidziany w przyjętym planie pod strefę z zabudową wielorodzinną (1386SW).
          </p>

          <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
            Fragment przyjętego{"\u00A0"}
            <a
              href="https://cdn.um.szczecin.pl/httpfiles/projekt_133.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 font-semibold hover:opacity-80"
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

          <p className="mt-6 text-sm md:text-base text-foreground/80 leading-relaxed">
            Obniżenie wskaźnika intensywności zabudowy z 1,6 do 1,2 w przyjętej wersji planu jest bez znaczenia. Nawet oryginalny projekt TBS ma intensywność niższą niż 1,2, a i tak jest on niedopasowany do okolicy z domami jednorodzinnymi (o maksymalnej intensywności 0,9, a w rzeczywistości znacznie niższej).
          </p>


        </div>

        <Dialog>
          <DialogTrigger asChild>
            <figure className="group relative mt-8 mx-auto w-full max-w-[45%] min-w-[280px] rounded-xl overflow-hidden border-2 border-destructive/30 bg-background shadow-md cursor-zoom-in transition-transform hover:scale-[1.01]">
              <img
                src={gorkiMaksZabudowa.url}
                alt="Wizualizacja maksymalnej zabudowy górek w Podjuchach według przyjętego planu ogólnego"
                className="w-full h-auto block"
              />
              <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-semibold text-foreground border border-border shadow-sm opacity-90 group-hover:opacity-100">
                <ZoomIn className="w-3.5 h-3.5" />
                Powiększ
              </div>
              <figcaption className="px-4 py-3 text-xs md:text-sm text-foreground/80 leading-relaxed border-t border-destructive/20">
                Tak w skrajnie pesymistycznym scenariuszu mogą wyglądać górki w Podjuchach (przy maksymalnej dopuszczonej planem ogólnym intensywności zabudowy 1,2 na całym obszarze strefy 1386SW).
              </figcaption>
            </figure>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <DialogTitle className="sr-only">Maksymalna zabudowa górek w Podjuchach</DialogTitle>
            <DialogDescription className="sr-only">
              Wizualizacja maksymalnej zabudowy górek w Podjuchach według przyjętego planu ogólnego.
            </DialogDescription>
            <img
              src={gorkiMaksZabudowa.url}
              alt="Wizualizacja maksymalnej zabudowy górek w Podjuchach według przyjętego planu ogólnego"
              className="w-full h-auto block rounded-md"
            />
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
              Tak w skrajnie pesymistycznym scenariuszu mogą wyglądać górki w Podjuchach (przy maksymalnej dopuszczonej planem ogólnym intensywności zabudowy 1,2 na całym obszarze strefy 1386SW).
            </p>
          </DialogContent>
        </Dialog>

        {/* Pomost wizualny łączący sekcję z "Co dalej?" */}
        <div className="mt-4 px-6 md:px-8 pt-2 pb-6">
          <div className="flex justify-center mb-6 text-muted-foreground">
            <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
          </div>
          <p className="text-lg md:text-2xl font-bold leading-tight text-foreground text-center">
            Nie odpuszczamy. <span className="text-destructive">Bloki na górkach jeszcze nie są przesądzone!</span><br /><span className="inline-block mt-3 text-2xl md:text-4xl">Co dalej?</span>
          </p>
        </div>



      </div>
    </section>
  );
};

export default CityResponseSection;
