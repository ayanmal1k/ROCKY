"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, Milestone, Percent, Users, Award } from "lucide-react";

export default function BentoGrid() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
      } as const,
    },
  };

  const hoverSpring = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  } as const;

  return (
    <section id="tokenomics" className="relative py-24 px-4 md:px-12 bg-stone-base overflow-hidden">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-emerald-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[300px] h-[300px] rounded-full bg-amber-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <span className="font-mono text-xs text-amber-gold tracking-widest uppercase block mb-3 font-semibold">GEOLOGICAL STRUCTURE</span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            THE IMMUTABLE <br />TOKENOMICS
          </h2>
          <p className="text-stone-400 text-base md:text-lg">
            Every block of $ROCKY is structured to reinforce token scarcity and maximize yield distribution. Review the cryptographic composition.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          
          {/* Card 1: Main Supply & Distribution (Wide & Tall) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={hoverSpring}
            className="md:col-span-2 row-span-2 glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-stone-500 uppercase tracking-wider">Allocation Ledger</span>
                <span className="bg-amber-gold/10 text-amber-glow font-mono text-xs px-2.5 py-1 rounded-md border border-amber-gold/20">TOTAL SUPPLY: 1B $ROCKY</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-6">Token Supply Distribution</h3>
              
              {/* Distribution visualizer */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-gold" />
                      Liquidity Pool (Burned)
                    </span>
                    <span className="font-mono text-stone-300">70.0% (700,000,000 $R)</span>
                  </div>
                  <div className="h-2.5 w-full bg-stone-border/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-amber-gold to-amber-glow rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent" />
                      Staking Rewards Vault
                    </span>
                    <span className="font-mono text-stone-300">20.0% (200,000,000 $R)</span>
                  </div>
                  <div className="h-2.5 w-full bg-stone-border/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "20%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-emerald-accent rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      Ecosystem & Community Airdrops
                    </span>
                    <span className="font-mono text-stone-300">10.0% (100,000,000 $R)</span>
                  </div>
                  <div className="h-2.5 w-full bg-stone-border/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "10%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-stone-500 text-xs mt-8 font-mono border-t border-stone-border/30 pt-4">
              * Liquidity pool tokens are permanently sent to the null address. 0% developer retention.
            </p>
          </motion.div>

          {/* Card 2: Liquidity Lock (Standard size) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={hoverSpring}
            className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-gold/10 border border-amber-gold/30 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-amber-gold" />
            </div>
            <div>
              <span className="font-mono text-xs text-stone-500 uppercase block mb-1">LIQUIDITY STATUS</span>
              <h3 className="font-display font-bold text-xl text-white mb-2">Locked Forever</h3>
              <p className="text-stone-400 text-sm">
                100% of initial LP tokens are burned. No administrative access key exists.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Tax Structure (Standard size) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={hoverSpring}
            className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-accent/10 border border-emerald-accent/30 flex items-center justify-center mb-6">
              <Percent className="w-6 h-6 text-emerald-accent" />
            </div>
            <div>
              <span className="font-mono text-xs text-stone-500 uppercase block mb-1">TRANSACTION PROTOCOL</span>
              <h3 className="font-display font-bold text-xl text-white mb-2">1% Friction Tax</h3>
              <p className="text-stone-400 text-sm">
                0.5% burned instantly, 0.5% redistributed directly to stakers in real time.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Audit & Security (Standard size) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={hoverSpring}
            className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <span className="font-mono text-xs text-stone-500 uppercase block mb-1">SECURITY METRIC</span>
              <h3 className="font-display font-bold text-xl text-white mb-2">Fully Audited</h3>
              <p className="text-stone-400 text-sm">
                Ownership renounced. Smart contracts validated by SolidProof with zero safety issues.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Roadmap Timeline (Wide) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={hoverSpring}
            className="md:col-span-2 glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Milestone className="w-5 h-5 text-amber-gold" />
                <span className="font-mono text-xs text-stone-500 uppercase tracking-wider">Evolution Plan</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-6">Project Roadmap</h3>
              
              {/* Timeline blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="relative pl-4 border-l border-amber-gold/30">
                  <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-amber-gold glow-bg-gold" />
                  <span className="font-mono text-xs text-amber-glow font-bold">Q3 2026</span>
                  <h4 className="text-sm font-bold text-white mt-1">Excavation</h4>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">Launch $ROCKY, lock liquidity, audit verification, build foundations.</p>
                </div>
                <div className="relative pl-4 border-l border-stone-border">
                  <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-stone-border" />
                  <span className="font-mono text-xs text-stone-500 font-bold">Q4 2026</span>
                  <h4 className="text-sm font-bold text-white mt-1">Refinement</h4>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">Staking pool launch, decentralized exchange listings, marketing surge.</p>
                </div>
                <div className="relative pl-4 border-l border-stone-border">
                  <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-stone-border" />
                  <span className="font-mono text-xs text-stone-500 font-bold">Q1 2027</span>
                  <h4 className="text-sm font-bold text-white mt-1">Crystallization</h4>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">Stone-DAO governance activation, multi-chain expansion, real world utility.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Community Governance (Standard size) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={hoverSpring}
            className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between min-h-[240px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-gold/10 border border-amber-gold/30 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-amber-gold" />
            </div>
            <div>
              <span className="font-mono text-xs text-stone-500 uppercase block mb-1">GOVERNANCE CORE</span>
              <h3 className="font-display font-bold text-xl text-white mb-2">DAO Powered</h3>
              <p className="text-stone-400 text-sm">
                Every token holder controls voting weights. We decide future liquidity locks and burns collectively.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
