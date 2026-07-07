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
    video: "/diamond.mp4",
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

    // Calculate how far to scroll horizontally
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each panel as it enters the viewport
      panelsRef.current.forEach((panel) => {
        if (!panel) return;

        const slab = panel.querySelector(".roadmap-slab-wrapper");
        const video = panel.querySelector(".roadmap-video-wrapper");

        if (slab) {
          gsap.fromTo(
            slab,
            { opacity: 0, x: -80, rotateY: 12 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById?.("roadmapScroll") || undefined,
                start: "left 80%",
                end: "left 30%",
                scrub: 1,
                // Use the main horizontal scroll trigger
              },
            }
          );
        }

        if (video) {
          gsap.fromTo(
            video,
            { opacity: 0, scale: 0.7, rotateZ: -5 },
            {
              opacity: 1,
              scale: 1,
              rotateZ: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "left 80%",
                end: "left 30%",
                scrub: 1,
              },
            }
          );
        }
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

            {/* Right — Gemstone Video */}
            <div className="roadmap-video-wrapper">
              <div
                className="roadmap-video-glow"
                style={{
                  background: `radial-gradient(circle, ${phase.gemColor}30 0%, transparent 70%)`,
                }}
              />
              <video
                className="roadmap-video"
                src={phase.video}
                autoPlay
                loop
                muted
                playsInline
              />
              <span
                className="roadmap-gem-label font-numpty"
                style={{
                  color: phase.gemColor,
                  textShadow: `0 0 18px ${phase.gemColor}66, 0 2px 0 #000`,
                }}
              >
                {phase.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
