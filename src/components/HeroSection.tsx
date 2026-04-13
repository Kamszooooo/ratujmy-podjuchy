import { useState, useEffect } from "react";

const HeroSection = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${
        collapsed ? "min-h-[25vh] md:min-h-[30vh]" : "min-h-[80vh] md:min-h-[90vh]"
      }`}
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
