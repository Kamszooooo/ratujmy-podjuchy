import { useState, useEffect, useRef, useCallback } from "react";

const COLLAPSED_VH = 30; // collapsed height in vh
const EXPANDED_VH = 90;  // max expanded height in vh
const OVERSCROLL_SENSITIVITY = 1.5; // pixels of wheel → vh expansion rate

const HeroSection = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [overscrollVh, setOverscrollVh] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/hero-bg.png";
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!imageLoaded) return;

    const timer = setTimeout(() => setCollapsed(true), 800);

    const handleInteraction = () => {
      setCollapsed(true);
      cleanup();
    };

    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("mousemove", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return cleanup;
  }, [imageLoaded]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!collapsed) return;
      if (window.scrollY > 0) {
        // If we have overscroll and user scrolls down, shrink it
        if (overscrollVh > 0) {
          setOverscrollVh((prev) => Math.max(0, prev - Math.abs(e.deltaY) / (window.innerHeight / 100) * OVERSCROLL_SENSITIVITY));
          e.preventDefault();
        }
        return;
      }

      // At top of page
      if (e.deltaY < 0) {
        // Scrolling up → expand
        const delta = Math.abs(e.deltaY) / (window.innerHeight / 100) * OVERSCROLL_SENSITIVITY;
        setOverscrollVh((prev) => Math.min(EXPANDED_VH - COLLAPSED_VH, prev + delta));
        e.preventDefault();
      } else if (e.deltaY > 0 && overscrollVh > 0) {
        // Scrolling down → shrink
        const delta = Math.abs(e.deltaY) / (window.innerHeight / 100) * OVERSCROLL_SENSITIVITY;
        setOverscrollVh((prev) => Math.max(0, prev - delta));
        e.preventDefault();
      }
    },
    [collapsed, overscrollVh]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!collapsed) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;

      if (window.scrollY > 0) {
        if (overscrollVh > 0) {
          setOverscrollVh((prev) => Math.max(0, prev - Math.abs(deltaY) / (window.innerHeight / 100) * OVERSCROLL_SENSITIVITY));
          e.preventDefault();
        }
        return;
      }

      if (deltaY < 0) {
        // Pulling down → expand
        const delta = Math.abs(deltaY) / (window.innerHeight / 100) * OVERSCROLL_SENSITIVITY;
        setOverscrollVh((prev) => Math.min(EXPANDED_VH - COLLAPSED_VH, prev + delta));
        e.preventDefault();
      } else if (deltaY > 0 && overscrollVh > 0) {
        const delta = Math.abs(deltaY) / (window.innerHeight / 100) * OVERSCROLL_SENSITIVITY;
        setOverscrollVh((prev) => Math.max(0, prev - delta));
        e.preventDefault();
      }
    },
    [collapsed, overscrollVh]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  const currentHeight = collapsed ? COLLAPSED_VH + overscrollVh : EXPANDED_VH;

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: `${currentHeight}vh`,
        transition: overscrollVh > 0 ? "none" : "min-height 1s ease-in-out",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-6 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          Ratujmy Podjuchy
        </h1>
        <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
          NIE dla blokowiska w Górnych Podjuchach!
        </p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block -mb-px">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
