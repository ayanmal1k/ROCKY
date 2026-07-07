"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect user's preferences for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      console.log("Reduced motion preferred. Smooth scroll disabled.");
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Make lenis globally accessible for other animations (like GSAP ScrollTrigger)
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
