import HeroSection from "@/components/HeroSection";
import MapComparisonSection from "@/components/MapComparisonSection";
import ArgumentsSection from "@/components/ArgumentsSection";
import ThreatSection from "@/components/ThreatSection";
import PhotosSection from "@/components/PhotosSection";
import StepsSection from "@/components/StepsSection";
import AboutFooter from "@/components/AboutFooter";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ThreatSection />
      <MapComparisonSection />
      <ArgumentsSection />
      <PhotosSection />
      <StepsSection />
      <AboutFooter />
      <FloatingCTA />
    </div>
  );
};

export default Index;
