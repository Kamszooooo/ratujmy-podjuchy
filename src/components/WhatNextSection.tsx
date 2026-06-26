import { Eye, Map, Contrast, Megaphone } from "lucide-react";

const items = [
  {
    icon: Map,
    title: "Plan ogólny dopuszcza, ale nie nakazuje",
    body: (
      <>
        Profil funkcjonalny strefy 1386SW w przyjętym planie ogólnym pozwala na zabudowę wielorodzinną,{" "}
        <strong className="font-semibold text-foreground">ale jej nie nakazuje!</strong> Dopuszcza też zabudowę jednorodzinną oraz tereny zieleni. O tym, co naprawdę powstanie, zdecyduje plan miejscowy (MPZP bądź ZPI), <strong className="font-semibold text-foreground">a o jego kształcie zdecyduje siła naszego protestu</strong>.
      </>
    ),
  },
  {
    icon: Megaphone,
    title: "Działamy dalej",
    body: (
      <>
        Działamy dalej przeciwko budowie blokowiska TBS na górkach w Podjuchach. <strong className="font-semibold text-foreground">W dalszym ciągu opowiadamy się za zabudową jednorodzinną i strefą zieleni.</strong> Wkrótce poinformujemy o naszych kolejnych inicjatywach.
      </>
    ),
  },
  {
    icon: Eye,
    title: "Pamiętamy o obietnicach",
    body: (
      <>
        Przed przyjęciem planu, próbując uzasadnić odrzucenie naszej propozycji, politycy i urzędnicy deklarowali, że skala osiedla TBS zostanie znacznie ograniczona względem{" "}
        <a
          href="https://wiadomosci.szczecin.eu/artykul/mieszkalnictwo/wiemy-juz-jak-bedzie-wygladalo-nowe-osiedle-w-podjuchach"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-semibold text-foreground hover:opacity-80"
        >
          pierwotnego projektu
        </a>{" "}
        (padały zapowiedzi ograniczenia liczby mieszkań o połowę). Mówiono też o zachowaniu korytarza ekologicznego w postaci zadrzewionego terenu między ul.{" "}Ukośną a ul.{" "}Olkuską.
      </>
    ),
  },
  {
    icon: Contrast,
    title: "Drobny sukces za autostradą",
    body: "Nasze 247 uwag w sprawie terenów za autostradą A6 przyniosło efekt wykreślenia z nich funkcji składów i magazynów. Niestety pozostawiono strefę usług zamiast strefy zieleni z usługami sportu i rekreacji.",
  },
];

const WhatNextSection = () => {
  return (
    <section className="px-4 bg-background pt-0 pb-[60px]">
      <div className="max-w-4xl mx-auto">
        <div>

          <div className="grid md:grid-cols-2 gap-4">
            {items.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-card rounded-2xl p-6 border border-border flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted text-muted-foreground shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-tight">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatNextSection;
