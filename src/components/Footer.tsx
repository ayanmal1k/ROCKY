"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-transparent border-t border-white/10 py-8 px-6 sm:px-12 md:px-20 z-20 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Rocky Text */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-numpty text-xl md:text-2xl tracking-wider text-stone-200 hover:text-amber-500 transition-colors duration-300">
            ROCKY
          </span>
          <span className="text-stone-500 text-xs font-semibold tracking-wider">
            &copy; {currentYear} ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Eyes Video (Full Width, No Circle Crop, No Cut-Out) */}
        <motion.div 
          className="flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-48 sm:w-64 md:w-80 flex items-center justify-center bg-transparent">
            <video
              src="/eyess.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Right Side: Circular Social Buttons (3D Bevelled Stone Look) */}
        <div className="flex items-center gap-4">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X"
            className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-b from-stone-500 to-stone-700 hover:from-stone-400 hover:to-stone-600 border-2 border-[#1a1b1e] rounded-full shadow-[inset_0_1.5px_0_rgba(255,255,255,0.3),_0_3px_0_#1a1b1e] transition-all duration-75 active:translate-y-[2px] active:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1),_0_0px_0_#1a1b1e]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Telegram"
            className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-b from-stone-500 to-stone-700 hover:from-stone-400 hover:to-stone-600 border-2 border-[#1a1b1e] rounded-full shadow-[inset_0_1.5px_0_rgba(255,255,255,0.3),_0_3px_0_#1a1b1e] transition-all duration-75 active:translate-y-[2px] active:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1),_0_0px_0_#1a1b1e]"
          >
            <svg className="w-5 h-5 fill-current translate-x-[-1px]" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-.97.53-1.34.52-.41-.01-1.2-.23-1.79-.42-.72-.24-1.29-.37-1.24-.78.03-.21.32-.43.88-.66 3.44-1.5 5.74-2.49 6.88-2.96 3.27-1.35 3.95-1.58 4.4-.158.1.22.1.48.09.74z" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
