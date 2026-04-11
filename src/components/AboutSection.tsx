import { Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
          <Heart className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">O mnie</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
