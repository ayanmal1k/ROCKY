"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";
import BentoGrid from "@/components/BentoGrid";
import SwapSimulator from "@/components/SwapSimulator";
import Footer from "@/components/Footer";

// Dynamically import GSAP-reliant components to prevent SSR conflicts
const ParallaxSection = dynamic(() => import("@/components/ParallaxSection"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-bg-dark text-foreground">
        <Hero />
        <ParallaxSection />
        <BentoGrid />
        <SwapSimulator />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
