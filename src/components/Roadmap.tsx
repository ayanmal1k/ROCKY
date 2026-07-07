"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Phase {
  number: number;
  name: string;
  gemColor: string;
  video: string;
  points: string[];
}

const phases: Phase[] = [
  {
    number: 1,
    name: "Emerald",
    gemColor: "#50C878",
    video: "/emerald.webm",
    points: [
      "Community launch & social channels live",
      "Initial token distribution & airdrop",
      "Website V1 & brand identity reveal",
    ],
  },
  {
    number: 2,
    name: "Ruby",
    gemColor: "#E0115F",
    video: "/ruby.webm",
    points: [
      "DEX listing & liquidity pool setup",
      "First partnerships & collaborations",
      "Rocky NFT collection teasers",
    ],
  },
  {
    number: 3,
    name: "Sapphire",
    gemColor: "#0F52BA",
    video: "/sapphir.webm",
    points: [
      "NFT mint & staking platform launch",
      "CEX listing applications submitted",
      "Rocky DAO governance voting begins",
    ],
  },
  {
    number: 4,
    name: "Diamond",
    gemColor: "#B9F2FF",
    video: "/diamond.webm",
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
  const videosRef = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const panelCount = phases.length;
    let activeIndex = 0; // track which panel is currently active

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
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            // Determine the active panel from scroll progress
            const progress = self.progress;
            const newIndex = Math.round(progress * (panelCount - 1));

            if (newIndex !== activeIndex) {
              // Pause old video
              const oldVideo = videosRef.current[activeIndex];
              if (oldVideo && !oldVideo.paused) {
                oldVideo.pause();
              }

              // Play new video from the start
              activeIndex = newIndex;
              const newVideo = videosRef.current[activeIndex];
              if (newVideo) {
                newVideo.currentTime = 0;
                newVideo.play().catch(() => { });
              }
            }
          },
        },
      });

      // Auto-play the first video on mount
      const firstVideo = videosRef.current[0];
      if (firstVideo) {
        firstVideo.currentTime = 0;
        firstVideo.play().catch(() => { });
      }
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

            {/* Right — Gemstone Video (no label, no loop) */}
            <div className="roadmap-video-wrapper">
              <div
                className="roadmap-video-glow"
                style={{
                  background: `radial-gradient(circle, ${phase.gemColor}30 0%, transparent 70%)`,
                }}
              />
              <video
                ref={(el) => {
                  if (el) videosRef.current[i] = el;
                }}
                className="roadmap-video"
                src={phase.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
