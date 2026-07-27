import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

const TARGET_ID = "city-reply";

const FloatingCityReplyBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const target = document.getElementById(TARGET_ID);
      if (!target) {
        setVisible(window.scrollY > 400);
        return;
      }
      const rect = target.getBoundingClientRect();
      // Hide once the section reaches the viewport
      const reached = rect.top <= window.innerHeight * 0.9;
      setVisible(window.scrollY > 400 && !reached);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(TARGET_ID);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4 transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <a
        href={`#${TARGET_ID}`}
        onClick={handleClick}
        className="mx-auto max-w-4xl flex items-center gap-3 rounded-2xl bg-destructive text-destructive-foreground px-4 py-3 sm:px-6 sm:py-4 shadow-2xl shadow-destructive/30 border border-destructive-foreground/10 hover:scale-[1.01] transition-transform"
        aria-label="Przejdź do sekcji o odpowiedzi miasta"
      >
        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        <span className="text-sm sm:text-base md:text-lg font-extrabold leading-snug text-left">
          Plan ogólny przyjęty. Nie odpuszczamy — przeczytaj, co dalej.
        </span>
      </a>
    </div>
  );
};

export default FloatingCityReplyBanner;
