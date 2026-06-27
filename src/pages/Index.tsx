import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import MapComparisonSection from "@/components/MapComparisonSection";
import ArgumentsSection from "@/components/ArgumentsSection";
import ThreatSection from "@/components/ThreatSection";
import PhotosSection from "@/components/PhotosSection";
import StepsSection from "@/components/StepsSection";
import CityResponseSection from "@/components/CityResponseSection";
import AboutFooter from "@/components/AboutFooter";
import FloatingCityReplyBanner from "@/components/FloatingCityReplyBanner";
import WhatNextSection from "@/components/WhatNextSection";
import FacebookFeedSection from "@/components/FacebookFeedSection";



const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ratujmy Podjuchy — NIE dla TBS na górkach!</title>
        <link rel="canonical" href="https://ratujmypodjuchy.pl/" />
        <meta property="og:url" content="https://ratujmypodjuchy.pl/" />
        <meta property="og:title" content="Ratujmy Podjuchy — NIE dla TBS na górkach!" />
        <meta property="og:description" content="Władze Szczecina chcą budowy bloków wielorodzinnych w górnej części Podjuch, na terenie między ul. Sąsiedzką a ul. Wschodnią. To absurdalny pomysł!" />
      </Helmet>
      <HeroSection />
      <ThreatSection />
      <MapComparisonSection />
      <ArgumentsSection />
      <StepsSection />
      <CityResponseSection />
      <WhatNextSection />
      <PhotosSection />
      <AboutFooter />
      <FloatingCityReplyBanner />
    </div>
  );
};

export default Index;
