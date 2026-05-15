import HeroSection from "@/components/HeroSection";
import MapComparisonSection from "@/components/MapComparisonSection";
import ArgumentsInfographic from "@/components/ArgumentsInfographic";
import ArgumentsSection from "@/components/ArgumentsSection";
import ThreatSection from "@/components/ThreatSection";
import PostersSection from "@/components/PostersSection";
import PhotosSection from "@/components/PhotosSection";
import StepsSection from "@/components/StepsSection";
import AboutFooter from "@/components/AboutFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ThreatSection />
      <MapComparisonSection />
      <ArgumentsInfographic />
      <ArgumentsSection />
      <PostersSection />
      <PhotosSection />
      <StepsSection />
      <AboutFooter />
    </div>
  );
};

export default Index;
