import { Handshake, Building2, Trees } from "lucide-react";

const items = [
  {
    icon: Handshake,
    title: "Trzymamy polityków za słowo",
    body: "Przed głosowaniem politycy i urzędnicy publicznie deklarowali, że skala osiedla TBS zostanie znacznie ograniczona względem pierwotnego projektu — padały zapowiedzi ograniczenia nawet o połowę. Obiecano też zachowanie korytarza ekologicznego między ul. Ukośną a ul. Olkuską. Będziemy z tych deklaracji rozliczać.",
  },
  {
    icon: Building2,
    title: "Plan dopuszcza, nie nakazuje",
    body: (
      <>
        Profil funkcjonalny strefy 1386SW w przyjętym planie ogólnym pozwala na zabudowę wielorodzinną,{" "}
        <strong className="font-semibold text-foreground">ale jej nie nakazuje!</strong> Dopuszcza też zabudowę jednorodzinną i tereny zieleni. O tym, co naprawdę powstanie, zdecyduje plan miejscowy (MPZP bądź ZPI), a o jego kształcie zdecyduje siła naszego nacisku.
      </>
    ),
  },
  {
    icon: Trees,
    title: "Drobny sukces za autostradą",
    body: "Nasze 247 uwag w sprawie terenów za autostradą A6 dało efekt: wykreślono z nich funkcję składów i magazynów. Niestety pozostawiono strefę usług zamiast strefy zieleni z usługami sportu i rekreacji.",
  },
];

const WhatNextSection = () => {
  return (
    <section className="px-4 bg-card py-[60px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Co dalej?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Przegrana bitwa to nie przegrana wojna. Tak walczymy o Podjuchy dalej.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-muted/50 rounded-2xl p-6 border border-border flex flex-col">
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
