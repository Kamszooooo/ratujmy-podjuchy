import { Eye, Map, Meh, Megaphone } from "lucide-react";

const items = [
  {
    icon: Map,
    title: "Plan ogólny dopuszcza, ale nie nakazuje",
    body: (
      <>
        Profil funkcjonalny strefy 1386SW w przyjętym planie ogólnym pozwala na zabudowę wielorodzinną,{" "}
        <strong className="font-semibold text-foreground">ale jej nie nakazuje!</strong> Dopuszcza też zabudowę jednorodzinną i tereny zieleni. O tym, co naprawdę powstanie, zdecyduje plan miejscowy (MPZP bądź ZPI), <strong className="font-semibold text-foreground">a o jego kształcie zdecyduje siła naszego nacisku</strong>.
      </>
    ),
  },
  {
    icon: Megaphone,
    title: "Nie odpuszczamy",
    body: "Działamy dalej przeciwko budowie blokowiska TBS na górkach w Podjuchach. W dalszym ciągu opowiadamy się za zabudową jednorodzinną i strefą zieleni. Wkrótce poinformujemy o naszych kolejnych inicjatywach.",
  },
  {
    icon: Eye,
    title: "Pamiętamy o obietnicach",
    body: "Przed przyjęciem planu, próbując uzasadnić odrzucenie naszej propozycji, politycy i urzędnicy deklarowali, że skala osiedla TBS zostanie znacznie ograniczona względem pierwotnego projektu. Padały zapowiedzi ograniczenia liczby mieszkań o połowę. Mówiono też o zachowaniu korytarza ekologicznego między ul. Ukośną a ul. Olkuską.",
  },
  {
    icon: Meh,
    title: "Drobny sukces za autostradą",
    body: "Nasze 247 uwag w sprawie terenów za autostradą A6 przyniosło efekt wykreślenia z nich funkcji składów i magazynów. Niestety pozostawiono strefę usług zamiast strefy zieleni z usługami sportu i rekreacji.",
  },
];

const WhatNextSection = () => {
  return (
    <section className="px-4 bg-background pt-6 pb-[60px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Co dalej?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-card rounded-2xl p-6 border border-border flex flex-col">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatNextSection;
