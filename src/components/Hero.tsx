"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const orbX = useMotionValue(0);
  const orbY = useMotionValue(0);
  const springOrbX = useSpring(orbX, { stiffness: 50, damping: 30 });
  const springOrbY = useSpring(orbY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      orbX.set((e.clientX - cx) * 0.02);
      orbY.set((e.clientY - cy) * 0.02);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [orbX, orbY]);

  useEffect(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll(".hero-char");
    // Set initial state via GSAP, then animate
    gsap.set(chars, { opacity: 0, y: 60, rotateX: -60, scale: 0.8 });
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      stagger: 0.018,
      duration: 1,
      ease: "power4.out",
      delay: 0.3,
    });
  }, []);

  const line1 = "We Build Scalable";
  const line2 = "& AI-Powered";
  const line3 = "Digital Products";

  const splitChars = (text: string) =>
    text.split("").map((c, i) => (
      <span key={i} className="hero-char inline-block">
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
      <Scene3D />

      {/* Ambient orbs — parallax on cursor */}
      <motion.div
        className="glow-orb w-[600px] h-[400px] bg-white/[0.018] top-[-10%] left-[15%]"
        style={{ x: springOrbX, y: springOrbY }}
      />
      <motion.div
        className="glow-orb w-[500px] h-[300px] bg-white/[0.012] bottom-[10%] right-[10%]"
        style={{
          x: useTransform(springOrbX, (v) => -v * 1.5),
          y: useTransform(springOrbY, (v) => -v * 1.5),
        }}
      />
      <motion.div
        className="glow-orb w-[300px] h-[300px] bg-white/[0.008] top-[40%] right-[30%]"
        style={{
          x: useTransform(springOrbX, (v) => v * 0.8),
          y: useTransform(springOrbY, (v) => v * 0.8),
        }}
      />

      <div className="relative z-10 max-w-[850px]">
        {/* Badge — always visible, animates in */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.15)" }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] badge-shine mb-10 backdrop-blur-sm cursor-default"
        >
          <span
            className="w-[7px] h-[7px] rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 10px rgba(52,211,153,0.6)", animation: "pulse-soft 2s infinite" }}
          />
          <span className="text-[14px] font-mono text-white/60 tracking-wide">
            Available for new projects
          </span>
        </motion.div>

        {/* Headline — GSAP sets initial state, no inline opacity:0 */}
        <h1
          ref={headlineRef}
          className="text-[clamp(2.8rem,7.5vw,5.8rem)] font-display font-black leading-[0.93] tracking-[-0.05em]"
          style={{ perspective: "800px" }}
        >
          <span className="block text-white">
            {splitChars(line1)}
          </span>
          <span className="block text-white/50">
            {splitChars(line2)}
          </span>
          <span className="block text-white">
            {splitChars(line3)}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 text-[17px] md:text-[19px] font-body text-white/50 max-w-[540px] mx-auto leading-[1.8]"
        >
          A two-person dev studio crafting modern web, mobile, and AI solutions.
          9+ websites, 3 mobile apps, and custom software — built to scale.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.25, 1, 0.5, 1] }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(255,255,255,0.12), 0 4px 20px rgba(255,255,255,0.06)",
            }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center gap-2.5 bg-white text-black font-semibold font-body text-[14px] px-7 py-3.5 rounded-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">View Our Work</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 font-body text-[14px] font-medium px-6 py-3.5 rounded-xl border border-white/[0.08] transition-all duration-300"
          >
            Contact Us
          </motion.a>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 flex items-center justify-center gap-6 md:gap-10 flex-wrap">
          {[
            { value: "9+", label: "Websites" },
            { value: "3", label: "Mobile Apps" },
            { value: "2+", label: "Years Exp." },
            { value: "15+", label: "Projects" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.12, duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ y: -5, scale: 1.06, borderColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.95 }}
              className="text-center px-6 py-4 rounded-xl border border-white/[0.05] bg-white/[0.015] card-shadow transition-all cursor-default"
            >
              <div className="text-[32px] md:text-[38px] font-display font-bold tracking-[-0.03em] text-white/90">
                {stat.value}
              </div>
              <div className="text-[12px] font-mono text-white/40 uppercase tracking-[0.15em] mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/25 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 glow-line" />
    </section>
  );
}
