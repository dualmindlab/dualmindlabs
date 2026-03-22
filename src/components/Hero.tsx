"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.025,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  const line1 = "AI for";
  const line2 = "developers";

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 pt-14 overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Ambient orbs */}
      <div className="glow-orb w-[600px] h-[400px] bg-indigo-600/[0.06] top-[-15%] left-[15%]" />
      <div className="glow-orb w-[500px] h-[350px] bg-purple-700/[0.04] top-[-5%] right-[10%]" />
      <div className="glow-orb w-[400px] h-[300px] bg-blue-600/[0.03] bottom-[10%] left-[30%]" />

      <div className="relative z-10 max-w-[750px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-[6px] rounded-full border border-white/[0.06] bg-white/[0.02] badge-shine mb-10 backdrop-blur-sm"
        >
          <span
            className="w-[5px] h-[5px] rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 10px rgba(52,211,153,0.6)", animation: "pulse-soft 2s infinite" }}
          />
          <span className="text-[12px] text-white/30 tracking-wide">
            Now accepting projects for Q2 2026
          </span>
        </motion.div>

        {/* Headline with GSAP char animation */}
        <h1
          ref={headlineRef}
          className="text-[clamp(3.2rem,9vw,6.5rem)] font-black leading-[0.9] tracking-[-0.06em]"
          style={{ perspective: "600px" }}
        >
          <span className="block gradient-text">
            {line1.split("").map((c, i) => (
              <span key={i} className="char inline-block" style={{ opacity: 0 }}>
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          <span className="block gradient-text-accent">
            {line2.split("").map((c, i) => (
              <span key={i} className="char inline-block" style={{ opacity: 0 }}>
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mt-7 text-[16px] md:text-[17px] text-white/30 max-w-[440px] mx-auto leading-[1.75] font-light"
        >
          The modern platform for building intelligent systems. Deploy production-grade AI and ML solutions at any scale.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mt-10 flex items-center justify-center gap-3 flex-wrap"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 bg-white text-black font-semibold text-[13.5px] px-6 py-[10px] rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.97] transition-all duration-300"
          >
            Get Started Free
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#docs"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 text-[13.5px] font-medium px-5 py-[10px] rounded-xl border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-50">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Documentation
          </a>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 1, 0.5, 1] }}
          className="mt-16 max-w-[560px] mx-auto"
        >
          <div className="rounded-xl border border-white/[0.06] bg-[#080808]/90 backdrop-blur-sm overflow-hidden shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8),0_0_60px_-30px_rgba(99,102,241,0.1)]">
            <div className="flex items-center justify-between px-4 py-[10px] border-b border-white/[0.04]">
              <div className="flex gap-[7px]">
                <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]/80" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]/80" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]/80" />
              </div>
              <span className="text-[10px] text-white/15 font-mono">deploy.ts</span>
              <span className="text-[10px] text-white/10 font-mono cursor-pointer hover:text-white/25 transition-colors">
                &#x2197; GitHub
              </span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-[2.1] overflow-x-auto">
              <div className="code-line"><span className="text-indigo-400/80">import</span> <span className="text-white/50">{"{ DualMind }"}</span> <span className="text-indigo-400/80">from</span> <span className="text-emerald-400/70">&apos;dualmind&apos;</span><span className="text-white/15">;</span></div>
              <div className="code-line h-3" />
              <div className="code-line"><span className="text-indigo-400/80">const</span> <span className="text-sky-400/70">ai</span> <span className="text-white/20">=</span> <span className="text-indigo-400/80">new</span> <span className="text-amber-300/70">DualMind</span><span className="text-white/15">();</span></div>
              <div className="code-line h-3" />
              <div className="code-line"><span className="text-indigo-400/80">const</span> <span className="text-sky-400/70">result</span> <span className="text-white/20">=</span> <span className="text-indigo-400/80">await</span> <span className="text-sky-400/70">ai</span><span className="text-white/15">.</span><span className="text-amber-300/70">deploy</span><span className="text-white/15">({"{"}</span></div>
              <div className="code-line">{"  "}<span className="text-white/40">model</span><span className="text-white/15">:</span> <span className="text-emerald-400/70">&apos;sentiment-v2&apos;</span><span className="text-white/15">,</span></div>
              <div className="code-line">{"  "}<span className="text-white/40">runtime</span><span className="text-white/15">:</span> <span className="text-emerald-400/70">&apos;gpu.a100&apos;</span><span className="text-white/15">,</span></div>
              <div className="code-line">{"  "}<span className="text-white/40">scale</span><span className="text-white/15">:</span> <span className="text-amber-400/70">true</span></div>
              <div className="code-line"><span className="text-white/15">{"})"}</span><span className="text-white/15">;</span></div>
              <div className="code-line h-3" />
              <div className="code-line"><span className="text-white/15">{"// → "}</span><span className="text-emerald-400/50">Deployed to 3 regions in 4.2s</span><span className="cursor-blink text-indigo-400/60 ml-0.5">▊</span></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 glow-line" />
    </section>
  );
}
