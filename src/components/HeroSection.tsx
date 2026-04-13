const HeroSection = () => {
  return (
    <section className="relative min-h-[30vh] md:min-h-[37vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundPosition: "center 65%" }}
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
