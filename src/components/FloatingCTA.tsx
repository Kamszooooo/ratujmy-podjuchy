import { useEffect, useRef, useState } from "react";
import { FileSignature } from "lucide-react";

const PETITION_URL =
  "https://www.petycjeonline.com/petycja_w_sprawie_uwzgldnienia_wnioskow_mieszkacow_do_planu_ogolnego_miasta_szczecin_dla_obszaru_podjuch";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > 400);

      const target = document.getElementById("petition-cta-target");
      const self = ref.current;
      if (!target || !self) {
        setOffset(null);
        return;
      }
      const targetRect = target.getBoundingClientRect();
      const inView =
        targetRect.top < window.innerHeight && targetRect.bottom > 0;

      if (inView) {
        const selfRect = self.getBoundingClientRect();
        // Move floating button's center to target's center
        const dx =
          targetRect.left + targetRect.width / 2 -
          (selfRect.left + selfRect.width / 2);
        const dy =
          targetRect.top + targetRect.height / 2 -
          (selfRect.top + selfRect.height / 2);
        setOffset({ x: dx, y: dy });
      } else {
        setOffset(null);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const merging = offset !== null;
  const transform = offset
    ? `translate(${offset.x}px, ${offset.y}px) scale(0.85)`
    : undefined;

  return (
    <div
      ref={ref}
      style={{ transform }}
      className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ease-out ${
        visible
          ? merging
            ? "opacity-0 pointer-events-none"
            : "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
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
