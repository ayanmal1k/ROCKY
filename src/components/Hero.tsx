"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 md:px-12 pb-16 md:pb-24 select-none">
      {/* Navbar at the top of Hero */}
      <Navbar />

      {/* Responsive Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 bg-[url('/mobile-hero-bg.png')] md:bg-[url('/heroo-bg.png')]"
      />

      {/* NO BACKGROUND OVERLAY FOR BRIGHT VISIBILITY */}

      {/* Bottom Gradient Fade to Match Target Design */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />

      {/* Hero Layout Grid */}
      <div className="relative z-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-20 lg:pt-0">

        {/* Left Side: Exact Text & Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left mb-6 lg:mb-0 transform translate-y-8 lg:-translate-x-12 lg:translate-y-6">

          {/* Headline Badge (Arial/Sans bold with black outline) */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="font-sans font-black text-white text-sm sm:text-lg md:text-2xl lg:text-3xl mb-4 badge-outline tracking-wider uppercase whitespace-nowrap"
          >
            THE PET ROCK OF SOLANA
          </motion.h3>

          {/* Main Massive Title */}
          <div className="flex flex-col gap-1 mb-5">
            {["NOT A DOG.", "NOT A FROG.", "JUST A ROCK."].map((line, idx) => (
              <div key={idx} className="overflow-visible">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 + idx * 0.1 }}
                  className="font-numpty font-black text-5xl sm:text-7xl md:text-8xl xl:text-9xl tracking-tight leading-[0.88] stoney-text"
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mb-8 leading-relaxed text-outline-dark font-semibold"
          >
            A legendary stone that rolled out of nowhere and became the strongest community on chain.
          </motion.p>

          {/* Three Custom Stone Buttons in Title Case */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="https://dexscreener.com/solana/dsmwcjnovtdpdpci9vdnhfekkjmf8r458zz7bytbxnkv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="stone-btn hero-buy-btn px-6 py-2.5 text-lg md:text-xl font-bold tracking-wide min-w-[140px]">
                Buy Rocky
              </button>
            </a>
            <a href="#roadmap">
              <button className="stone-btn px-6 py-2.5 text-lg md:text-xl font-bold tracking-wide min-w-[140px]">
                View Rockmap
              </button>
            </a>
            <a
              href="https://t.me/RockyOnSolPortal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="stone-btn px-6 py-2.5 text-lg md:text-xl font-bold tracking-wide min-w-[140px]">
                Join Community
              </button>
            </a>
          </motion.div>

        </div>

        {/* Right Side: Spacer to expose the character baked in hero-bg.png */}
        <div className="lg:col-span-5 h-[300px] lg:h-auto pointer-events-none" />

      </div>
    </div>
  );
}
