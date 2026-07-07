"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rockyContainerRef = useRef<HTMLDivElement>(null);

  // Eye pupil positions (percentage offset from center)
  const [leftPupil, setLeftPupil] = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });

  const calcPupilOffset = useCallback(
    (mouseX: number, mouseY: number, eyeCenterX: number, eyeCenterY: number) => {
      const dx = mouseX - eyeCenterX;
      const dy = mouseY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 200);
      const maxOffset = 28; // max % the pupil can move
      const factor = (dist / 200) * maxOffset;
      return {
        x: Math.cos(angle) * factor,
        y: Math.sin(angle) * factor,
      };
    },
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();

    const secX = e.clientX - rect.left;
    const secY = e.clientY - rect.top;
    const vpX = e.clientX;
    const vpY = e.clientY;

    // Calculate eye positions relative to the rocky container
    if (rockyContainerRef.current) {
      const rockyRect = rockyContainerRef.current.getBoundingClientRect();
      const imgW = rockyRect.width;
      const imgH = rockyRect.height;

      // Eye centers relative to the rocky container (tuned for the stone image)
      // Left eye: ~38% from left, ~30% from top
      // Right eye: ~62% from left, ~30% from top
      const leftEyeX = rockyRect.left + imgW * 0.38;
      const leftEyeY = rockyRect.top + imgH * 0.28;
      const rightEyeX = rockyRect.left + imgW * 0.62;
      const rightEyeY = rockyRect.top + imgH * 0.28;

      setLeftPupil(calcPupilOffset(e.clientX, e.clientY, leftEyeX, leftEyeY));
      setRightPupil(calcPupilOffset(e.clientX, e.clientY, rightEyeX, rightEyeY));
    }

    requestAnimationFrame(() => {
      if (sectionRef.current) {
        sectionRef.current.style.setProperty("--mouse-x", `${secX}px`);
        sectionRef.current.style.setProperty("--mouse-y", `${secY}px`);
        sectionRef.current.style.setProperty("--mouse-vp-x", `${vpX}px`);
        sectionRef.current.style.setProperty("--mouse-vp-y", `${vpY}px`);
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="about-section about-bg relative overflow-hidden select-none group"
      id="about"
    >
      {/* Dynamic Spotlight Overlay */}
      <div className="spotlight-overlay" aria-hidden="true" />

      {/* Top/Bottom Gradient Fade Transitions */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-30" />

      {/* Content layer — sits above spotlight, below bottom fade */}
      <div className="relative z-20 w-full flex flex-col items-center px-6 sm:px-12 md:px-20 pt-24 pb-0">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="font-numpty font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-center mb-10 sm:mb-14 stoney-text uppercase leading-none"
        >
          About Rocky
        </motion.h2>

        {/* Body Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.15 }}
          className="w-full text-center mb-8"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-numpty leading-relaxed spotlight-text">
            Born from the rugged depths of the blockchain, Rocky is the ultimate testament to endurance, community, and pure stoney determination. In a world full of fleeting dogs, hyperactive frogs, and transient memes that turn to dust overnight, Rocky stands solid—unmoved, unphased, and unbreakable.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-numpty leading-relaxed spotlight-text mt-6">
            This legendary stone rolled out of the digital abyss with no promises and initially no eyes. Yet, the community saw its strength. We gathered around this silent monolith, carving our hopes, our memes, and our collective diamond hands into its surface. Trends fade, but rocks endure forever.
          </p>
        </motion.div>
      </div>

      {/* Rocky Image with Googly Eyes — anchored to bottom, 20% cut off */}
      <motion.div
        ref={rockyContainerRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 70, damping: 22, delay: 0.3 }}
        className="about-rocky-container"
      >
        {/* The stone image */}
        <img
          src="/rocky-no-eyes.png"
          alt="Rocky"
          className="about-rocky-img"
          draggable="false"
        />

        {/* Googly Eyes Overlay */}
        <div className="googly-eyes-wrapper" aria-hidden="true">
          {/* Left Eye */}
          <div className="googly-eye googly-eye--left">
            <div
              className="googly-pupil"
              style={{
                transform: `translate(${leftPupil.x}%, ${leftPupil.y}%)`,
              }}
            />
          </div>
          {/* Right Eye */}
          <div className="googly-eye googly-eye--right">
            <div
              className="googly-pupil"
              style={{
                transform: `translate(${rightPupil.x}%, ${rightPupil.y}%)`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
