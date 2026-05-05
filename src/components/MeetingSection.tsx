import { Calendar, MapPin, Clock, Facebook } from "lucide-react";
import { useState, useEffect } from "react";

const MEETING_DATE = new Date("2026-05-16T12:00:00").getTime();

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, MEETING_DATE - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, expired: diff === 0 };
}

const Unit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-background border border-border rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-sm">
      <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">{label}</span>
  </div>
);

const MeetingSection = () => {
  const { days, hours, minutes, seconds, expired } = useCountdown();

  return (
    <section className="px-4 py-16 bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide mb-4">
            Najbliższe wydarzenie
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Spotkanie z miastem i&nbsp;TBS
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Przyjdź i&nbsp;wyraź swój sprzeciw wobec budowy blokowiska w&nbsp;Górnych Podjuchach!
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-8 h-8 text-primary mb-2" />
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Data</div>
              <div className="text-lg font-bold text-foreground">16 maja 2026</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="w-8 h-8 text-primary mb-2" />
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Godzina</div>
              <div className="text-lg font-bold text-foreground">12:00</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 text-primary mb-2" />
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Miejsce</div>
              <div className="text-lg font-bold text-foreground">DK Krzemień</div>
              <div className="text-sm text-muted-foreground">Sala widowiskowa</div>
            </div>
          </div>

          {!expired && (
            <div className="border-t border-border pt-6">
              <div className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Do spotkania pozostało
              </div>
              <div className="flex justify-center gap-3 sm:gap-5">
                <Unit value={days} label="dni" />
                <Unit value={hours} label="godz." />
                <Unit value={minutes} label="min." />
                <Unit value={seconds} label="sek." />
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <a
              href="https://www.facebook.com/profile.php?id=61574321447466"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Profil inicjatywy na Facebooku
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingSection;
