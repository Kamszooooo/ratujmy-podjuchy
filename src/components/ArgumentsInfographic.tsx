import { useState } from "react";
import { Building2, Trees, TrafficCone, Users, Mountain, Droplets, Bus, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Argument = {
  id: string;
  icon: typeof Building2;
  title: string;
  short: string;
  stat?: { value: string; label: string };
  details: { icon: typeof Building2; text: string }[];
  accent: "primary" | "leaf" | "accent";
};

const ARGUMENTS: Argument[] = [
  {
    id: "lad",
    icon: Building2,
    title: "Ład przestrzenny",
    short: "Bloki nie pasują do jednorodzinnego charakteru okolicy",
    stat: { value: "99%", label: "mieszkańców Podjuch chce zabudowy jednorodzinnej" },
    accent: "primary",
    details: [
      { icon: Home, text: "Teren z trzech stron otoczony zabudową jednorodzinną (strefa 872SJ)." },
      { icon: Users, text: "Ankieta Rady Osiedla: 469 z 474 mieszkańców za zabudową jednorodzinną." },
      { icon: Building2, text: "Nowa zabudowa powinna kontynuować skalę i formę sąsiedztwa." },
    ],
  },
  {
    id: "przyroda",
    icon: Trees,
    title: "Uwarunkowania przyrodnicze",
    short: "Wzgórza, lasy i otulina Puszczy Bukowej",
    stat: { value: ">20%", label: "nachylenia zboczy — plan ochrony parku zakazuje tam zabudowy" },
    accent: "leaf",
    details: [
      { icon: Mountain, text: "Strome wzgórza i punkty widokowe eksponowane w krajobrazie." },
      { icon: Trees, text: "Zwarty obszar zalesiony między ul. Ukośną a Olkuską." },
      { icon: Droplets, text: "Przepływający strumień, otulina Szczecińskiego Parku Krajobrazowego." },
    ],
  },
  {
    id: "infrastruktura",
    icon: TrafficCone,
    title: "Ograniczenia infrastrukturalne",
    short: "Lokalne uliczki nie udźwigną 560 nowych mieszkań",
    stat: { value: "560", label: "mieszkań planuje TBS — paraliż komunikacyjny okolicy" },
    accent: "accent",
    details: [
      { icon: TrafficCone, text: "Obsługa przez wąskie ul. Sąsiedzką, Wschodnią i Żeliwną." },
      { icon: Bus, text: "25 min pieszo do SKM Podjuchy, autobus 904 tylko „na żądanie”." },
      { icon: Droplets, text: "Wodociągi i kanalizacja w dużej części z połowy XX w." },
    ],
  },
];

const accentMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    ring: "ring-primary",
    solid: "bg-primary text-primary-foreground",
  },
  leaf: {
    bg: "bg-[hsl(var(--leaf)/0.15)]",
    text: "text-[hsl(var(--forest-mid))]",
    border: "border-[hsl(var(--forest-mid)/0.3)]",
    ring: "ring-[hsl(var(--forest-mid))]",
    solid: "bg-[hsl(var(--forest-mid))] text-primary-foreground",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/30",
    ring: "ring-accent",
    solid: "bg-accent text-accent-foreground",
  },
};

const ArgumentsInfographic = () => {
  const [active, setActive] = useState<string>(ARGUMENTS[0].id);
  const current = ARGUMENTS.find((a) => a.id === active)!;
  const c = accentMap[current.accent];

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Dlaczego mówimy NIE?</h2>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Trzy filary naszej uwagi do projektu planu. Kliknij, żeby poznać szczegóły.
        </p>

        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {ARGUMENTS.map((arg) => {
            const Icon = arg.icon;
            const isActive = arg.id === active;
            const ac = accentMap[arg.accent];
            return (
              <button
                key={arg.id}
                onClick={() => setActive(arg.id)}
                className={cn(
                  "group text-left rounded-2xl border p-5 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg",
                  isActive
                    ? cn(ac.border, "bg-card shadow-md ring-2", ac.ring)
                    : "border-border bg-card/50 hover:bg-card",
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors",
                    isActive ? ac.solid : cn(ac.bg, ac.text),
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{arg.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{arg.short}</p>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          key={current.id}
          className={cn(
            "animate-fade-in-up rounded-3xl border p-6 md:p-8 bg-card",
            c.border,
          )}
        >
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            {current.stat && (
              <div
                className={cn(
                  "rounded-2xl p-6 text-center md:min-w-[200px]",
                  c.bg,
                )}
              >
                <div className={cn("text-5xl md:text-6xl font-bold leading-none mb-2", c.text)}>
                  {current.stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground leading-snug">
                  {current.stat.label}
                </div>
              </div>
            )}

            <ul className="space-y-3">
              {current.details.map((d, i) => {
                const Icon = d.icon;
                return (
                  <li
                    key={i}
                    className="flex gap-3 items-start animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div
                      className={cn(
                        "shrink-0 w-9 h-9 rounded-lg flex items-center justify-center",
                        c.bg,
                        c.text,
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed pt-1">
                      {d.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArgumentsInfographic;
