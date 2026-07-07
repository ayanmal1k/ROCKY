"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hammer, Flame, Gem } from "lucide-react";

// Register ScrollTrigger client-side
gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const layerBgRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerForeRef = useRef<HTMLDivElement>(null);
  
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Use GSAP Context for easy React cleanup
    const ctx = gsap.context(() => {
      // 1. Pinned Horizontal/Vertical Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300%", // scroll length 3x viewport height
          scrub: 1, // smooth scrubbing
          pin: true,
          anticipatePin: 1,
        },
      });

      // 2. Parallax Layers & Background color transitions
      tl.to(layerBgRef.current, { y: "-15%", ease: "none" }, 0)
        .to(layerMidRef.current, { y: "-40%", ease: "none" }, 0)
        .to(layerForeRef.current, { y: "-70%", ease: "none" }, 0)
        // Background color shift (stone -> magma orange -> deep golden emerald)
        .to(triggerRef.current, { backgroundColor: "#1e1005", duration: 1 }, 0.5)
        .to(triggerRef.current, { backgroundColor: "#060f0a", duration: 1 }, 1.5);

      // 3. Staggered Text Revelations
      // First text fades out as we scroll
      tl.to(textRef1.current, { opacity: 0, y: -80, filter: "blur(10px)", duration: 0.8 }, 0)
        // Second text fades in, pins briefly, then fades out
        .fromTo(
          textRef2.current,
          { opacity: 0, y: 100, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          0.6
        )
        .to(textRef2.current, { opacity: 0, y: -100, filter: "blur(10px)", duration: 0.8 }, 1.6)
        // Third text fades in
        .fromTo(
          textRef3.current,
          { opacity: 0, y: 120, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          2.2
        );
    });

    return () => ctx.revert(); // clean up GSAP when component unmounts
  }, []);

  return (
    <div ref={triggerRef} className="relative bg-bg-dark w-full overflow-hidden transition-colors duration-700">
      
      {/* Dynamic Grid Background Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,34,48,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,34,48,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main Viewport Container */}
      <div ref={containerRef} className="relative h-screen w-full flex items-center justify-center">
        
        {/* PARALLAX LAYER 1: Deep Background Mountains (Move slowest) */}
        <div 
          ref={layerBgRef} 
          className="absolute bottom-[-10%] left-0 w-full h-[65%] pointer-events-none opacity-40 select-none z-10"
        >
          <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
            <path d="M0,600 L0,320 L180,240 L420,380 L680,200 L950,340 L1220,150 L1440,280 L1440,600 Z" fill="#161824" />
            <path d="M300,600 L300,420 L550,290 L800,460 L1100,320 L1440,500 L1440,600 Z" fill="#0f101a" />
          </svg>
        </div>

        {/* PARALLAX LAYER 2: Midground Mountain Slabs (Move medium speed) */}
        <div 
          ref={layerMidRef} 
          className="absolute bottom-[-20%] left-0 w-full h-[60%] pointer-events-none opacity-70 select-none z-20"
        >
          <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
            {/* Glowing gold/magma cracks */}
            <path d="M0,600 L0,400 L240,320 L580,480 L880,260 L1180,420 L1440,300 L1440,600 Z" fill="#1a1c29" />
            <path d="M240,320 L580,480 L880,260" stroke="#e29a27" strokeWidth="3" fill="none" opacity="0.4" />
          </svg>
        </div>

        {/* PARALLAX LAYER 3: Foreground Jagged Stone Rocks (Move fastest) */}
        <div 
          ref={layerForeRef} 
          className="absolute bottom-[-30%] left-0 w-full h-[55%] pointer-events-none select-none z-40"
        >
          <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
            <path d="M0,600 L0,480 L160,390 L390,520 L720,360 L1050,500 L1280,340 L1440,460 L1440,600 Z" fill="#0c0d15" />
            {/* Highlights */}
            <path d="M160,390 L390,520 L720,360 L1050,500" stroke="#ffd074" strokeWidth="2.5" fill="none" opacity="0.2" />
          </svg>
        </div>

        {/* Text Story Overlays - Choreographed via GSAP */}
        <div className="absolute inset-0 flex items-center justify-center z-30 px-6">
          
          {/* SECTION 1: Excavation */}
          <div ref={textRef1} className="max-w-4xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-gold/10 border border-amber-gold/30 flex items-center justify-center mb-6">
              <Hammer className="w-8 h-8 text-amber-gold" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">
              Phase I: Excavation
            </h2>
            <p className="font-sans text-stone-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              We extract value from raw computation. Out of empty space, we carve the foundations of a solid community treasury. Built to withstand market pressure.
            </p>
          </div>

          {/* SECTION 2: Refinement */}
          <div ref={textRef2} className="absolute max-w-4xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center mb-6">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">
              Phase II: Refinement
            </h2>
            <p className="font-sans text-stone-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              Forged in fire. 100% of initial liquidity is burned to the geologic core. Zero dev holdings. No rug-pull faults in the rocky crust.
            </p>
          </div>

          {/* SECTION 3: Crystallization */}
          <div ref={textRef3} className="absolute max-w-4xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-accent/10 border border-emerald-accent/30 flex items-center justify-center mb-6">
              <Gem className="w-8 h-8 text-emerald-accent" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">
              Phase III: Vaulting
            </h2>
            <p className="font-sans text-stone-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              An eternal crystal structure. Stake $ROCKY to claim your share of geological energy. Generate high-density yields backed by transaction-tax reserves.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
