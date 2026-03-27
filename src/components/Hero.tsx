"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

// ─── Typewriter hook ──────────────────────────────────────────────────────────
// Uses setInterval (not RAF) so it runs even when the tab is backgrounded.
// Variable speed (±10 ms jitter) gives it a human feel without being slow.

function useTypewriter(
  text: string,
  { speed = 38, delay = 0, enabled = true }: { speed?: number; delay?: number; enabled?: boolean } = {}
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    setCount(0);
    let i = 0;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) clearInterval(iv);
      }, Math.max(18, speed + (Math.random() - 0.5) * 20));
    }, delay);
    return () => { clearTimeout(t); clearInterval(iv); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, enabled]);

  return { text: text.slice(0, count), done: count >= text.length };
}

// ─── Blinking cursor ─────────────────────────────────────────────────────────

function Cursor({ show, height = "0.85em" }: { show: boolean; height?: string }) {
  if (!show) return null;
  return (
    <span
      className="type-cursor"
      style={{ height, width: 2 }}
      aria-hidden="true"
    />
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Hero() {
  // Parallax orbs
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

  // ── Badge text (fast, parallel) ───────────────────────────────────────────
  const badgeLive   = useTypewriter("LIVE",   { speed: 90, delay: 80  });
  const badgeTagline= useTypewriter("Shipping Revenue-Ready Products Since 2023", { speed: 16, delay: 180 });
  const badgeUptime = useTypewriter("99.9% uptime", { speed: 22, delay: 260 });

  // ── Headline (cascade: l1 → l2 → l3) ────────────────────────────────────
  const l1 = "Ship Products";
  const l2 = "That Scale Past";
  const l3a = "Your First ";   // white
  const l3b = "$10M";          // gradient-text-neon

  const line1 = useTypewriter(l1, { speed: 40, delay: 700 });
  const line2 = useTypewriter(l2, { speed: 38, delay: 0, enabled: line1.done });
  const line3 = useTypewriter(l3a + l3b, { speed: 38, delay: 0, enabled: line2.done });

  // Split line3 displayed text into white + neon parts
  const l3aLen = l3a.length;
  const line3White  = line3.text.slice(0, l3aLen);
  const line3Accent = line3.text.slice(l3aLen);

  // ── Trigger subtitle/stats after heading finishes ─────────────────────────
  const headlineDone = line3.done;

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
      <Scene3D />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Neon radial glow behind headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, oklch(72% 0.22 250 / 0.055) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Parallax orbs */}
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

      <div className="relative z-10 max-w-[900px] w-full">

        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ scale: 1.04 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] badge-shine mb-10 backdrop-blur-sm cursor-default"
        >
          {/* Live indicator */}
          <span className="flex items-center gap-1.5 shrink-0">
            <span
              className="w-[7px] h-[7px] rounded-full bg-emerald-400 flex-shrink-0"
              style={{ boxShadow: "0 0 10px rgba(52,211,153,0.7)", animation: "pulse-soft 2s infinite" }}
            />
            <span className="text-[11px] font-mono text-emerald-400/90 tracking-wider min-w-[28px] text-left">
              {badgeLive.text}
              <Cursor show={!badgeLive.done} height="0.7em" />
            </span>
          </span>

          <span className="w-px h-3.5 bg-white/[0.12] shrink-0" />

          {/* Tagline */}
          <span className="text-[13px] md:text-[15px] font-mono text-white/85 tracking-wide min-w-[10ch]">
            {badgeTagline.text}
            <Cursor show={!badgeTagline.done} height="0.75em" />
          </span>

          <span className="w-px h-3.5 bg-white/[0.12] shrink-0 hidden sm:block" />

          {/* Uptime */}
          <span className="text-[11px] font-mono text-white/72 hidden sm:block min-w-[4ch]">
            {badgeUptime.text}
            <Cursor show={!badgeUptime.done} height="0.65em" />
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <h1
          className="kinetic-text text-[clamp(3rem,8vw,6rem)] font-display font-black leading-[0.92] tracking-[-0.05em]"
          style={{ perspective: "800px" }}
        >
          {/* Line 1 */}
          <span className="block text-white">
            {line1.text || <span className="opacity-0">_</span>}
            <Cursor show={!line1.done && line1.text.length > 0} height="0.75em" />
          </span>

          {/* Line 2 */}
          <span className="block text-white/88">
            {line2.text || <span className="opacity-0">_</span>}
            <Cursor show={line1.done && !line2.done} height="0.75em" />
          </span>

          {/* Line 3 — split white + neon */}
          <span className="block">
            <span className="text-white">{line3White}</span>
            <span className="gradient-text-neon">{line3Accent}</span>
            <Cursor show={line2.done && !line3.done} height="0.75em" />
            {/* Final cursor blinks a moment then fades */}
            {line3.done && (
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="gradient-text-neon"
              >
                <Cursor show height="0.75em" />
              </motion.span>
            )}
          </span>
        </h1>

        {/* ── Subtitle ── */}
        <AnimatePresence>
          {headlineDone && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="mt-8 text-[17px] md:text-[20px] font-body text-white/90 max-w-[580px] mx-auto leading-[1.82]"
            >
              Ashwin + Mohit — an AI-native dev studio that builds agentic workflows,
              SaaS architectures, and mobile products for startups serious about scale.
              <span className="text-white font-medium"> 15+ products shipped. Zero missed deadlines.</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── CTA buttons ── */}
        <AnimatePresence>
          {headlineDone && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="mt-10 flex items-center justify-center gap-4 flex-wrap"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative inline-flex items-center gap-2.5 btn-neon-green btn-ripple font-semibold font-body text-[15px] px-8 py-4 rounded-xl overflow-hidden"
              >
                <span className="relative z-10">See What We&apos;ve Built</span>
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
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.22)",
                }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-body text-[15px] font-medium px-7 py-4 rounded-xl border border-white/[0.16] transition-all duration-300"
              >
                Start a Project →
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats ── */}
        <AnimatePresence>
          {headlineDone && (
            <div className="mt-20 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
              {[
                { value: "15+",  label: "Products Shipped" },
                { value: "9+",   label: "SaaS / Web" },
                { value: "3",    label: "Mobile Apps" },
                { value: "100%", label: "On-Time Delivery" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center px-5 py-4 md:px-7 md:py-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] card-shadow cursor-default hover:border-white/[0.14] transition-colors duration-300"
                >
                  <div className="text-[28px] md:text-[38px] font-display font-bold tracking-[-0.03em] text-white">
                    {stat.value}
                  </div>
                  <div className="text-[12px] md:text-[13px] font-mono text-white/72 uppercase tracking-[0.15em] mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {headlineDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-white/55 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Organic bottom edge */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{ height: 52 }}>
        <svg viewBox="0 0 1440 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 52 L0 30 Q180 8 360 24 Q540 40 720 20 Q900 2 1080 22 Q1260 40 1440 14 L1440 52 Z" fill="oklch(7% 0.005 250)" />
        </svg>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  );
}
