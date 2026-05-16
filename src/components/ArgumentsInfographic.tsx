import { Home, Trees, Car, Users, Building2, TrendingUp, Train, Bus, Mountain } from "lucide-react";

const ArgumentsInfographic = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
        Dlaczego mówimy <span className="text-destructive">NIE</span>?
      </h3>
      <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" />

      {/* Trzy filary argumentów */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-foreground text-2xl">Ład przestrzenny</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Otoczenie to zabudowa jednorodzinna. Projekt planu ogólnego przewiduje zabudowę o intensywności aż <span className="font-bold">1.6</span>, podczas gdy w okolicy wskaźnik ten wynosi&nbsp;<span className="font-bold">0.9</span>.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Trees className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-foreground text-2xl">Przyroda</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Teren jest pagórkowaty, zajmują go łąki i lasy. Częściowo podmokły, ze źródłami i strumieniem. Położony w otulinie Parku Krajobrazowego „Puszcza Bukowa”.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-foreground text-2xl">Infrastruktura</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Słaby dostęp do komunikacji publicznej. Wąskie ulice osiedlowe nie udźwigną wzmożonego ruchu i jeszcze bardziej zakorkuje się wjazd do Podjuch.
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
          <div className="text-center md:text-left md:flex md:flex-col md:justify-center">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
              <Building2 className="w-4 h-4 text-muted-foreground md:hidden" />
              <span className="text-3xl font-bold text-foreground md:text-3xl">~1000 <span className="text-2xl md:text-3xl">mieszkań</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:contents">
            <div className="text-center md:text-left md:border-l md:border-border md:pl-6">
            <div className="text-2xl font-bold text-foreground md:text-2xl">560 <span className="text-lg md:text-xl">mieszkań</span></div>
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                planuje wybudować TBS między ul. Ukośną a autostradą
              </p>
            </div>

            <div className="text-center md:text-left border-l border-border pl-4 md:pl-6">
              <div className="text-2xl font-bold text-foreground md:text-2xl">~500 <span className="text-lg md:text-xl">mieszkań</span></div>
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                może dodatkowo powstać między ul. Ukośną a Olkuską
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold text-slate-800 md:text-3xl">Łącznie ~3000 osób</div>
            <p className="text-xs md:text-sm text-muted-foreground leading-tight">
              (licząc trzy osoby na mieszkanie)
            </p>
          </div>

          {/* Wizualizacja proporcji */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Podjuchy dziś: <span className="font-semibold text-foreground">7 592</span> mieszkańców
                {" → "}
                wzrost o aż <span className="font-bold md:text-lg text-amber-600 text-xl">40%!</span>
              </span>
            </div>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-slate-700 rounded-full"
                style={{ width: "72%" }}
                title="Obecni mieszkańcy"
              />
              <div
                className="absolute inset-y-0 bg-amber-500"
                style={{ left: "72%", width: "28%" }}
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
              <span className="text-3xl font-bold text-slate-800 md:text-3xl">czyli <span className="text-destructive">~2000</span> <span className="text-[0.75em]">dodatkowych</span> samochodów!</span>
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
                pieszo do przystanku SKM Podjuchy
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
                pieszo do przystanku autobusu do centrum Szczecina
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                (linia 61, przystanek Szlamowa)
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
