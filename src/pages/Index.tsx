import HeroSection from "@/components/HeroSection";
import HighwaySection from "@/components/HighwaySection";
import MapComparisonSection from "@/components/MapComparisonSection";
import ArgumentsSection from "@/components/ArgumentsSection";
import ThreatSection from "@/components/ThreatSection";
import MeetingSection from "@/components/MeetingSection";
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
      <ArgumentsSection />
      <MeetingSection />
      <PostersSection />
      <PhotosSection />
      <StepsSection />
      <HighwaySection />
      <AboutFooter />
    </div>
  );
};

export default Index;

