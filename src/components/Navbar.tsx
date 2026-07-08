"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 w-full z-30 px-4 py-4 md:px-12 md:py-6 flex items-center justify-between max-w-7xl mx-auto"
    >
      {/* Logo Area: Rocky Image + Text */}
      <div className="flex items-center gap-3 select-none">
        <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
          <Image
            src="/rocky.png"
            alt="Rocky Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        <span className="font-numpty text-xl md:text-2xl tracking-wider text-white badge-outline">
          ROCKY
        </span>
      </div>
      {/* Action Button: Buy Rocky */}
      <div>
        <a
          href="https://dexscreener.com/solana/dsmwcjnovtdpdpci9vdnhfekkjmf8r458zz7bytbxnkv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="stone-btn px-5 py-1.5 md:px-6 md:py-2 text-sm sm:text-base md:text-lg font-bold tracking-wide">
            Buy Rocky
          </button>
        </a>
      </div>
    </motion.nav>
  );
}
