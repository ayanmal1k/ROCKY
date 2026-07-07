"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Shield, Layers, HelpCircle, Activity } from "lucide-react";

// Magnetic Button Wrapper for premium micro-interactions
export function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    // Calculate distance from button center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Move button 30% towards the mouse position
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Coin rotation values based on mouse movement
  const coinX = useMotionValue(0);
  const coinY = useMotionValue(0);
  
  // Spring configurations for smooth coin inertia
  const rotateX = useSpring(useTransform(coinY, [-200, 200], [20, -20]), { stiffness: 100, damping: 15 });
  const rotateY = useSpring(useTransform(coinX, [-200, 200], [-20, 20]), { stiffness: 100, damping: 15 });
  const coinScale = useSpring(1, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate cursor distance from center of the screen
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    coinX.set(mouseX);
    coinY.set(mouseY);
  };

  const handleMouseLeave = () => {
    coinX.set(0);
    coinY.set(0);
    coinScale.set(1);
  };

  const handleMouseEnter = () => {
    coinScale.set(1.08);
  };

  // State for simulated live price
  const [price, setPrice] = useState(0.0482);
  const [priceChange, setPriceChange] = useState(12.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => {
        const delta = (Math.random() - 0.48) * 0.0005; // biased positive
        const nextPrice = prev + delta;
        setPriceChange(c => c + (delta > 0 ? 0.05 : -0.05));
        return parseFloat(nextPrice.toFixed(4));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-bg-dark pt-6 px-4 md:px-12 pb-12 select-none"
    >
      {/* Dynamic Background Noise/Glowing Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[300px] h-[300px] rounded-full bg-emerald-accent/5 blur-[100px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative z-50 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-gold to-amber-glow flex items-center justify-center font-display font-black text-bg-dark text-xl shadow-[0_0_20px_rgba(226,154,39,0.3)]">
            R
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-wider text-white">ROCKY</span>
            <span className="text-xs block text-stone-400 font-mono tracking-widest leading-none">TOKEN</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2.5 rounded-full border-stone-border/60">
          <a href="#parallax" className="text-sm font-medium text-stone-300 hover:text-amber-gold transition-colors duration-300">Journey</a>
          <a href="#tokenomics" className="text-sm font-medium text-stone-300 hover:text-amber-gold transition-colors duration-300">Tokenomics</a>
          <a href="#swap" className="text-sm font-medium text-stone-300 hover:text-amber-gold transition-colors duration-300">Swap Hub</a>
          <a href="#community" className="text-sm font-medium text-stone-300 hover:text-amber-gold transition-colors duration-300">Community</a>
        </nav>

        {/* Live Price Ticker */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-stone-card/60 border border-stone-border/40 py-1.5 px-3 rounded-lg font-mono text-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-accent"></span>
            </span>
            <span className="text-stone-400">$ROCKY:</span>
            <span className="text-white font-bold">${price}</span>
            <span className="text-emerald-accent flex items-center font-semibold">
              <ArrowUpRight className="w-3 h-3" />
              {priceChange.toFixed(1)}%
            </span>
          </div>
          
          <MagneticButton 
            className="bg-amber-gold hover:bg-amber-glow text-bg-dark px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(226,154,39,0.25)] hover:shadow-[0_4px_25px_rgba(226,154,39,0.4)]"
            onClick={() => {
              document.getElementById("swap")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get $ROCKY
          </MagneticButton>
        </div>
      </header>

      {/* Main Hero Grid */}
      <main className="relative z-40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-auto pt-10 md:pt-0">
        
        {/* Left: Text & Info */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Animated Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex items-center gap-2 bg-stone-card/50 border border-amber-gold/30 text-amber-glow py-1 px-3 rounded-full text-xs font-semibold mb-6 tracking-wide"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse text-amber-gold" />
            STRENGTH IN GEOLOGICAL SCALE
          </motion.div>

          {/* Staggered Heading */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
              className="font-display font-black text-5xl md:text-7xl xl:text-8xl text-white leading-[1.05]"
            >
              SOLID AS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-gold via-amber-glow to-white glow-text-gold">
                ROCK COIN.
              </span>
            </motion.h1>
          </div>

          {/* Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="text-stone-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed font-sans"
          >
            Forged in the deep heat of decentralized engineering. $ROCKY offers immutable asset solidity, heavy-duty liquidity structures, and an ironclad community vault.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <MagneticButton 
              className="bg-white hover:bg-stone-200 text-bg-dark px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-xl"
              onClick={() => {
                document.getElementById("swap")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Enter Mining Hub
            </MagneticButton>
            <button 
              onClick={() => {
                document.getElementById("parallax")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-stone-border hover:border-amber-gold/50 bg-stone-card/30 hover:bg-stone-card/60 text-stone-200 hover:text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300"
            >
              Read Whitepaper
            </button>
          </motion.div>

          {/* Quick Features */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 border-t border-stone-border/50 pt-8 w-full max-w-lg"
          >
            <div>
              <div className="flex items-center gap-2 text-stone-300 font-bold mb-1">
                <Shield className="w-4 h-4 text-amber-gold" />
                <span>Audited</span>
              </div>
              <span className="text-stone-500 text-xs font-mono">100% SECURE VAULT</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-stone-300 font-bold mb-1">
                <Layers className="w-4 h-4 text-emerald-accent" />
                <span>Liquidity</span>
              </div>
              <span className="text-stone-500 text-xs font-mono">LOCKED FOREVER</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-stone-300 font-bold mb-1">
                <HelpCircle className="w-4 h-4 text-amber-glow" />
                <span>Supply</span>
              </div>
              <span className="text-stone-500 text-xs font-mono">1,000,000,000 $R</span>
            </div>
          </motion.div>

        </div>

        {/* Right: Floating 3D Rocky Token */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-12 lg:py-0">
          {/* Background Ambient Ring */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-stone-border/20 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-stone-border/10 animate-spin-slow pointer-events-none" />
          
          <motion.div
            style={{ rotateX, rotateY, scale: coinScale, transformStyle: "preserve-3d" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-80 h-80 cursor-pointer flex items-center justify-center z-10"
          >
            {/* Animated Float Layer */}
            <div className="animate-float relative w-full h-full">
              
              {/* Backside Glow shadow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-gold to-amber-glow blur-2xl opacity-30 mix-blend-screen pointer-events-none" />
              
              {/* Main Coin Core */}
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd074" />
                    <stop offset="50%" stopColor="#e29a27" />
                    <stop offset="100%" stopColor="#7a4e09" />
                  </linearGradient>
                  <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2c303f" />
                    <stop offset="100%" stopColor="#0a0b0d" />
                  </linearGradient>
                  <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e29a27" />
                    <stop offset="100%" stopColor="#05cd72" />
                  </linearGradient>
                  
                  {/* Stone texture pattern */}
                  <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" />
                    <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                </defs>

                {/* Coin Outer Ring (Gold rim) */}
                <circle cx="100" cy="100" r="92" fill="url(#goldGrad)" />
                
                {/* Inner Border (Dark ridge) */}
                <circle cx="100" cy="100" r="84" fill="#13161f" />
                
                {/* Coin Face (Stone Core) */}
                <circle cx="100" cy="100" r="80" fill="url(#stoneGrad)" />
                <circle cx="100" cy="100" r="80" fill="white" filter="url(#noiseFilter)" opacity="0.4" />

                {/* Geological fractures in coin background */}
                <path d="M 40,80 L 70,120 L 120,60 M 80,160 L 110,130 L 160,150" stroke="#1e2230" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />

                {/* Golden Runes / Engravings on Border */}
                <circle cx="100" cy="100" r="87" stroke="#ffd074" strokeWidth="1" strokeDasharray="3 7" fill="none" opacity="0.6" />

                {/* Central Logo: R shaped like jagged rocky mountains */}
                {/* Left vertical column (stone mountain slab) */}
                <path 
                  d="M 68,145 L 68,55 L 95,55 C 120,55 132,70 132,88 C 132,102 122,112 105,115 L 135,145" 
                  stroke="url(#goldGrad)" 
                  strokeWidth="14" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none" 
                />
                
                {/* Inner rocky ridge overlay */}
                <path 
                  d="M 68,90 L 92,72 L 105,95 L 132,88" 
                  stroke="#ffffff" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  fill="none" 
                  opacity="0.5" 
                />
                
                {/* Core Golden crystal peak */}
                <polygon points="100,75 110,95 90,95" fill="#ffd074" opacity="0.8" />
              </svg>
            </div>
          </motion.div>
        </div>

      </main>

      {/* Hero Bottom: Scroll Indicator & Socials */}
      <footer className="relative z-40 flex items-center justify-between w-full mt-10 md:mt-0 pt-6 border-t border-stone-border/20 text-stone-500 font-mono text-xs">
        <div className="flex items-center gap-6">
          <span>COORDINATES: 45.109, -122.680</span>
          <span className="hidden md:inline">LIQUIDITY CONTRACT: IMMUTABLE_VAULT</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#parallax" className="group flex items-center gap-2 text-stone-400 hover:text-amber-gold transition-colors duration-300">
            <span>SCROLL DOWN</span>
            <motion.span 
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="block"
            >
              ↓
            </motion.span>
          </a>
        </div>
      </footer>
    </div>
  );
}
