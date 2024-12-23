import React from "react";
import HeroSection from "@/components/Homepage/HeroSection";
import FeatureSection from "@/components/Homepage/FeatureSection";
import StatsSection from "@/components/Homepage/StatsSection";
import SolutionSection from "@/components/Homepage/SolutionSection";
function Homepage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
        <SolutionSection />
    </div>
  );
}

export default Homepage;
