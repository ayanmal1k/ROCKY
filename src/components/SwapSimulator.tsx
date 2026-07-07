"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Info, HelpCircle, CheckCircle } from "lucide-react";
import { MagneticButton } from "./Hero";

const TOKEN_RATES: { [key: string]: number } = {
  SOL: 4500,
  ETH: 72000,
  USDT: 20.8,
};

export default function SwapSimulator() {
  const [fromToken, setFromToken] = useState("SOL");
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Calculate swap output
  useEffect(() => {
    const val = parseFloat(fromAmount);
    if (!isNaN(val) && val > 0) {
      setToAmount((val * TOKEN_RATES[fromToken]).toLocaleString(undefined, { maximumFractionDigits: 2 }));
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken]);

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    setIsSwapping(true);
    
    // Simulate mining/swapping delay
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      
      // Spawn golden particle explosion
      const newParticles = Array.from({ length: 25 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200 - 50,
      }));
      setParticles(newParticles);
      
      setTimeout(() => {
        setSwapSuccess(false);
        setParticles([]);
      }, 3500);
    }, 2000);
  };

  const selectToken = (token: string) => {
    setFromToken(token);
  };

  return (
    <section id="swap" className="relative py-24 px-4 md:px-12 bg-stone-base overflow-hidden border-t border-stone-border/20">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-gold/5 blur-[130px] pointer-events-none" />

      <div className="max-w-md mx-auto relative">
        {/* Section Title */}
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-amber-gold tracking-widest uppercase block mb-2 font-semibold">MINING PORTAL</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">SWAP SIMULATOR</h2>
        </div>

        {/* Swap Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="glass-panel p-6 rounded-3xl relative z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-stone-300 text-sm font-semibold">Swap</span>
            <div className="flex gap-2">
              {["SOL", "ETH", "USDT"].map((token) => (
                <button
                  key={token}
                  onClick={() => selectToken(token)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
                    fromToken === token
                      ? "bg-amber-gold text-bg-dark"
                      : "bg-stone-card/80 text-stone-400 hover:text-stone-200 border border-stone-border/40"
                  }`}
                >
                  {token}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="bg-stone-card/60 border border-stone-border/40 p-4 rounded-2xl mb-2 focus-within:border-amber-gold/50 transition-colors duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-500 text-xs font-mono">You Pay</span>
              <span className="text-stone-400 text-xs font-mono">Balance: 12.5 {fromToken}</span>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                disabled={isSwapping}
                className="bg-transparent text-white text-2xl font-bold font-mono focus:outline-none w-2/3"
              />
              <span className="text-white font-bold font-display text-lg">{fromToken}</span>
            </div>
          </div>

          {/* Icon Spacer */}
          <div className="flex justify-center -my-3 relative z-20">
            <div className="bg-stone-border text-amber-gold p-2 rounded-xl border-4 border-stone-card shadow-lg">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* Output Box */}
          <div className="bg-stone-card/60 border border-stone-border/40 p-4 rounded-2xl mt-2 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-500 text-xs font-mono">You Get (Estimated)</span>
              <span className="text-stone-400 text-xs font-mono">Balance: 0 $R</span>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="text"
                readOnly
                value={toAmount}
                placeholder="0.00"
                className="bg-transparent text-white text-2xl font-bold font-mono focus:outline-none w-2/3"
              />
              <span className="text-amber-gold font-bold font-display text-lg">$ROCKY</span>
            </div>
          </div>

          {/* Price details */}
          <div className="space-y-2 mb-6 text-xs text-stone-500 border-t border-stone-border/30 pt-4 font-mono">
            <div className="flex justify-between">
              <span>Rate</span>
              <span className="text-stone-300">1 {fromToken} ≈ {TOKEN_RATES[fromToken].toLocaleString()} $ROCKY</span>
            </div>
            <div className="flex justify-between">
              <span>Slippage Tolerance</span>
              <span className="text-stone-300">0.5%</span>
            </div>
            <div className="flex justify-between">
              <span>Liquidity Fee</span>
              <span className="text-emerald-accent">Free (Locked LP)</span>
            </div>
          </div>

          {/* Swap Trigger Button */}
          <MagneticButton
            className="w-full bg-gradient-to-r from-amber-gold to-amber-glow text-bg-dark font-display font-black py-4 rounded-2xl shadow-[0_8px_30px_rgba(226,154,39,0.2)]"
            onClick={handleSwap}
          >
            {isSwapping ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-bg-dark border-t-transparent rounded-full" />
                MINING ORE...
              </span>
            ) : swapSuccess ? (
              "CRYSTALLIZED!"
            ) : (
              "SWAP ASSETS"
            )}
          </MagneticButton>

          {/* Particle Blast */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ 
                x: p.x, 
                y: p.y, 
                scale: 0.1, 
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-glow to-amber-gold z-50 pointer-events-none"
            />
          ))}

          {/* Success Overlay */}
          <AnimatePresence>
            {swapSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-stone-card/95 rounded-3xl z-40 flex flex-col items-center justify-center text-center p-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="mb-4 text-emerald-accent"
                >
                  <CheckCircle className="w-16 h-16" />
                </motion.div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">Extraction Successful</h3>
                <p className="text-stone-400 text-sm max-w-[240px] mb-4">
                  {fromAmount} {fromToken} successfully swapped for {toAmount} $ROCKY.
                </p>
                <button 
                  onClick={() => setSwapSuccess(false)}
                  className="text-amber-gold hover:text-amber-glow text-xs font-bold font-mono tracking-wider uppercase border border-amber-gold/30 px-4 py-2 rounded-xl transition-colors duration-300"
                >
                  Close Receipt
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
