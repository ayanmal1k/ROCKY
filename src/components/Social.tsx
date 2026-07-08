"use client";

import { motion } from "framer-motion";

export default function Social() {
  return (
    <section className="relative w-full min-h-[80vh] bg-transparent flex items-center justify-center py-16 px-6 sm:px-12 md:px-20 overflow-hidden select-none z-10">
      
      {/* Grid container */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Only the rocky-animated.webm video with NO bg, border, or box */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center pointer-events-none"
          >
            <video
              src="/rocky-animated.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>

        {/* Right Side: Title, description, and premium X & Telegram buttons */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Section Badge */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="font-sans font-black text-amber-500 text-sm sm:text-base mb-4 tracking-widest uppercase badge-outline"
          >
            STAY UNBREAKABLE
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.1 }}
            className="font-numpty text-4xl sm:text-6xl md:text-7xl leading-[0.9] stoney-text uppercase mb-6"
          >
            JOIN THE ROCKY CLAN
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-stone-300 text-base sm:text-lg md:text-xl font-semibold leading-relaxed mb-8 max-w-xl text-outline-dark"
          >
            Roll with the most solid community on Solana. Follow us on X and join our Telegram to trade memes, catch the latest updates, and watch the legend unfold. Trends crumble, but Rocky stays forever.
          </motion.p>

          {/* Buttons Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <a
              href="https://x.com/RockySolanaCoin"
              target="_blank"
              rel="noopener noreferrer"
              className="stone-btn px-8 py-3.5 text-lg md:text-xl font-bold tracking-wide min-w-[200px] flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              {/* X Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>FOLLOW ON X</span>
            </a>

            <a
              href="https://t.me/RockyOnSolPortal"
              target="_blank"
              rel="noopener noreferrer"
              className="stone-btn px-8 py-3.5 text-lg md:text-xl font-bold tracking-wide min-w-[200px] flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              {/* Telegram Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-.97.53-1.34.52-.41-.01-1.2-.23-1.79-.42-.72-.24-1.29-.37-1.24-.78.03-.21.32-.43.88-.66 3.44-1.5 5.74-2.49 6.88-2.96 3.27-1.35 3.95-1.58 4.4-.158.1.22.1.48.09.74z" />
              </svg>
              <span>TELEGRAM</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
