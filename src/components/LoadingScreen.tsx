"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling when loading screen is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-black"
        >
          {/* Centered Rocky video */}
          <div className="w-80 h-80 sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] relative flex items-center justify-center max-w-[90vw]">
            <video
              src="/rocky-animated.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          {/* Loader Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 font-numpty text-lg sm:text-2xl md:text-3xl tracking-wide text-white uppercase text-outline-dark text-center px-6 max-w-xl"
          >
            You here to meet Rocky?
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
