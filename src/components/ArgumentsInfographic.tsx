import { Home, Trees, Car, Users, Building2, TrendingUp, Train, Bus, Mountain } from "lucide-react";

const ArgumentsInfographic = () => {
  return (
    <div className="max-w-5xl mx-auto mb-10">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
        Dlaczego mówimy <span className="text-destructive">NIE</span>?
      </h3>
      <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" />

      {/* Trzy filary argumentów */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Home className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-bold text-lg text-foreground mb-2">Ład przestrzenny</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Otoczenie to zabudowa jednorodzinna. 99% mieszkańców (ankieta rady osiedla) preferuje na tym terenie zabudowę jednorodzinną.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Trees className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-bold text-lg text-foreground mb-2">Przyroda</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Teren jest pagórkowaty. Zajmują go nie tylko łąki, ale też i tereny lesiste. Częściowo jest podmokły, znajdują się na nim źródła i wypływa z niego strumień.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-bold text-lg text-foreground mb-2">Infrastruktura</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Wąskie ulice osiedlowe nie udźwigną wzmożonego ruchu i jeszcze bardziej zakorkuje się wjazd do Podjuch.
          </p>
        </div>
      </div>

      {/* Skala inwestycji */}
      <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-border rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-destructive" />
          <h4 className="font-bold text-lg text-foreground">Skala planowanej zabudowy</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
              <Building2 className="w-4 h-4 text-muted-foreground md:hidden" />
              <span className="text-3xl md:text-4xl font-bold text-foreground">~1000 <span className="text-2xl md:text-3xl">mieszkań</span></span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-tight">
              &zwnj;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:contents">
            <div className="text-center md:text-left md:border-l md:border-border md:pl-6">
            <div className="text-2xl md:text-3xl font-bold text-foreground">560 <span className="text-lg md:text-xl">mieszkań</span></div>
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                ma wybudować TBS między ul. Ukośną a autostradą
              </p>
            </div>

            <div className="text-center md:text-left border-l border-border pl-4 md:pl-6">
              <div className="text-2xl md:text-3xl font-bold text-foreground">~500 <span className="text-lg md:text-xl">mieszkań</span></div>
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                może dodatkowo powstać między ul. Ukośną a Olkuską
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-3xl md:text-4xl font-bold text-slate-800">Łącznie ~3000 osób</div>
            <p className="text-xs md:text-sm text-muted-foreground leading-tight">
              (licząc trzy osoby/mieszkanie)
            </p>
          </div>

          {/* Wizualizacja proporcji */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Podjuchy dziś: <span className="font-semibold text-foreground">8 600</span> mieszkańców
                {" → "}
                wzrost o <span className="font-bold text-destructive text-base md:text-lg">35%</span>
              </span>
            </div>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-slate-700 rounded-full"
                style={{ width: "74%" }}
                title="Obecni mieszkańcy"
              />
              <div
                className="absolute inset-y-0 bg-amber-500"
                style={{ left: "74%", width: "26%" }}
                title="Nowi mieszkańcy"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-700" /> obecni mieszkańcy
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> nowi mieszkańcy
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
              <Car className="w-4 h-4 text-muted-foreground md:hidden" />
              <span className="text-3xl md:text-4xl font-bold text-slate-800">czyli <span className="text-destructive">~2000</span> dodatkowych samochodów!</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-tight">
              (licząc półtorej samochodu na mieszkanie)
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Train className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground leading-tight md:text-2xl">25 min</div>
              <p className="text-xs text-muted-foreground leading-tight mt-1 md:text-lg">
                do przystanku SKM Podjuchy
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Bus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground leading-tight md:text-2xl">21 min</div>
              <p className="text-xs text-muted-foreground leading-tight mt-1 md:text-lg">
                do przystanku autobusu linii 61 Szlamowa
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mountain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground leading-tight md:text-2xl">50–75 m</div>
              <p className="text-xs text-muted-foreground leading-tight mt-1 md:text-lg">
                wspinaczki w górę
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                (w zależności od położenia budynku)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArgumentsInfographic;
