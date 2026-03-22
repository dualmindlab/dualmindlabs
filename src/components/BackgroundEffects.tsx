"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-left gradient blob */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[100px] md:-top-[200px] -left-[100px] md:-left-[200px] w-[350px] md:w-[700px] h-[350px] md:h-[700px] rounded-full opacity-[0.025] will-change-transform"
        style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
      />

      {/* Bottom-right gradient blob */}
      <motion.div
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -25, 0],
          scale: [1, 0.9, 1.08, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[150px] md:-bottom-[300px] -right-[100px] md:-right-[200px] w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full opacity-[0.02] will-change-transform"
        style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
      />

      {/* Center floating blob */}
      <motion.div
        animate={{
          x: [0, 40, -30, 20, 0],
          y: [0, -30, 20, -15, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[50%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full opacity-[0.012] will-change-transform"
        style={{ background: "radial-gradient(circle, #fff 0%, transparent 65%)" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Horizontal accent lines */}
      <div className="absolute top-[25vh] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute top-[50vh] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
      <div className="absolute top-[75vh] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.015] to-transparent" />

      {/* Floating dots — hidden on mobile for performance */}
      <div className="hidden md:block">
        {[
          { top: "12%", left: "8%", size: 2, delay: 0, dur: 6 },
          { top: "28%", left: "85%", size: 3, delay: 1, dur: 8 },
          { top: "45%", left: "15%", size: 2, delay: 2, dur: 7 },
          { top: "62%", left: "78%", size: 2, delay: 0.5, dur: 9 },
          { top: "78%", left: "45%", size: 3, delay: 1.5, dur: 6 },
          { top: "88%", left: "22%", size: 2, delay: 3, dur: 8 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.05, 0.2, 0.05], scale: [1, 1.5, 1] }}
            transition={{ duration: dot.dur, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
            className="absolute rounded-full bg-white will-change-transform"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
          />
        ))}
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
    </div>
  );
}
