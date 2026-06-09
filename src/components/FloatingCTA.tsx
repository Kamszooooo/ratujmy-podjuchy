import { useEffect, useState } from "react";
import { FileSignature } from "lucide-react";

const PETITION_URL =
  "https://www.petycjeonline.com/petycja_w_sprawie_uwzgldnienia_wnioskow_mieszkacow_do_planu_ogolnego_miasta_szczecin_dla_obszaru_podjuch";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href={PETITION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 rounded-full bg-primary text-primary-foreground font-bold text-base md:text-lg shadow-2xl hover:scale-105 transition-transform"
        aria-label="Podpisz petycję"
      >
        <FileSignature className="w-5 h-5 md:w-6 md:h-6" />
        <span>Podpisz petycję</span>
      </a>
    </div>
  );
};

export default FloatingCTA;
