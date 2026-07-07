"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Phase {
  number: number;
  name: string;
  gemColor: string;
  gif: string;
  points: string[];
}

const phases: Phase[] = [
  {
    number: 1,
    name: "Emerald",
    gemColor: "#50C878",
    gif: "/rockmap/emerald.gif",
    points: [
      "Community launch & social channels live",
      "Initial token distribution & airdrop",
      "Website V1 & brand identity reveal",
    ],
  },
  {
    number: 2,
    name: "Sapphire",
    gemColor: "#0F52BA",
    gif: "/rockmap/sapphire.gif",
    points: [
      "NFT mint & staking platform launch",
      "CEX listing applications submitted",
      "Rocky DAO governance voting begins",
    ],
  },
  {
    number: 3,
    name: "Ruby",
    gemColor: "#E0115F",
    gif: "/rockmap/ruby.gif",
    points: [
      "DEX listing & liquidity pool setup",
      "First partnerships & collaborations",
      "Rocky NFT collection teasers",
    ],
  },
  {
    number: 4,
    name: "Diamond",
    gemColor: "#B9F2FF",
    gif: "/rockmap/diamond.gif",
    points: [
      "Major CEX listing confirmed",
      "Cross-chain bridge deployment",
      "Rocky metaverse experience beta",
    ],
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const panelCount = phases.length;

    // Calculate how far to scroll horizontally
    const getScrollDistance = () => {
      return track.scrollWidth - window.innerWidth;
    };

    // Build explicit snap points: [0, 0.333, 0.666, 1] for 4 panels
    const snapPoints = Array.from({ length: panelCount }, (_, i) =>
      i / (panelCount - 1)
    );

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.15, max: 0.3 },
            delay: 0,
            ease: "power3.out",
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="roadmap-section"
      id="roadmap"
    >
      {/* Full background — no dark overlay */}
      <div className="roadmap-bg" />

      {/* Section Title */}
      <div className="roadmap-title-wrapper">
        <h2 className="font-numpty stoney-text roadmap-title">ROCKMAP</h2>
      </div>

      {/* Horizontal scrolling track */}
      <div ref={trackRef} className="roadmap-track">
        {phases.map((phase, i) => (
          <div
            key={phase.number}
            ref={(el) => {
              if (el) panelsRef.current[i] = el;
            }}
            className="roadmap-panel"
          >
            {/* Left — Stone Slab with Phase Info */}
            <div className="roadmap-slab-wrapper">
              <div className="roadmap-slab">
                {/* Stone slab background image */}
                <img
                  src="/stone-slab.png"
                  alt="Stone slab"
                  className="roadmap-slab-img"
                  draggable={false}
                />
                {/* Text overlay on the slab */}
                <div className="roadmap-slab-content">
                  <span
                    className="roadmap-phase-badge font-numpty"
                    style={{
                      color: phase.gemColor,
                      textShadow: `0 0 20px ${phase.gemColor}55, 0 2px 0 #000`,
                    }}
                  >
                    PHASE {phase.number}
                  </span>
                  <h3
                    className="roadmap-phase-name font-numpty"
                    style={{
                      color: phase.gemColor,
                      textShadow: `0 0 30px ${phase.gemColor}44, 0 3px 0 #000`,
                    }}
                  >
                    {phase.name}
                  </h3>
                  <ul className="roadmap-checklist">
                    {phase.points.map((point, j) => (
                      <li key={j} className="roadmap-check-item font-numpty">
                        <span className="roadmap-check-icon">✔</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right — Gemstone GIF with glow + transform */}
            <div className="roadmap-video-wrapper">
              <div
                className="roadmap-video-glow"
                style={{
                  background: `radial-gradient(circle, ${phase.gemColor}30 0%, transparent 70%)`,
                }}
              />
              <img
                className="roadmap-gem-gif"
                src={phase.gif}
                alt={`${phase.name} gemstone`}
                draggable={false}
                style={{
                  filter: `drop-shadow(0 0 25px ${phase.gemColor}88) drop-shadow(0 0 60px ${phase.gemColor}44)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
