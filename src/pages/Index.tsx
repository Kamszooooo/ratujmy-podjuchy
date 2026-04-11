import HeroSection from "@/components/HeroSection";
import HighwaySection from "@/components/HighwaySection";
import MapComparisonSection from "@/components/MapComparisonSection";
import ArgumentsSection from "@/components/ArgumentsSection";
import ThreatSection from "@/components/ThreatSection";
import StepsSection from "@/components/StepsSection";
import AboutSection from "@/components/AboutSection";
import { TreePine } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ThreatSection />
      <MapComparisonSection />
      <ArgumentsSection />
      <StepsSection />
      <AboutSection />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <TreePine className="w-4 h-4" />
          <span>Ratujmy Podjuchy © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
