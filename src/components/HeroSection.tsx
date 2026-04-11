import { TreePine, Leaf } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[33vh] flex items-center justify-center overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <TreePine className="absolute top-10 left-[10%] w-20 h-20 text-primary-foreground" />
        <TreePine className="absolute top-20 right-[15%] w-16 h-16 text-primary-foreground" />
        <Leaf className="absolute bottom-20 left-[20%] w-12 h-12 text-primary-foreground rotate-45" />
        <TreePine className="absolute bottom-10 right-[25%] w-24 h-24 text-primary-foreground" />
        <Leaf className="absolute top-[40%] left-[5%] w-10 h-10 text-primary-foreground -rotate-12" />
      </div>

      <div className="relative z-10 text-center px-6 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
          Ratujmy Podjuchy
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
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
