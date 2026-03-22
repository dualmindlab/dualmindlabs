"use client";

import { motion } from "framer-motion";
import SR from "./ScrollReveal";

export default function BottomCTA() {
  return (
    <section id="contact" className="relative py-40 px-5 text-center overflow-hidden">
      {/* Ambient */}
      <div className="glow-orb w-[500px] h-[300px] bg-indigo-600/[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb w-[300px] h-[200px] bg-purple-600/[0.03] top-[30%] right-[20%]" />

      <div className="relative z-10 max-w-[560px] mx-auto">
        <SR>
          <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-black tracking-[-0.05em] leading-[0.95]">
            <span className="gradient-text">Start building</span>
            <br />
            <span className="gradient-text-accent">today</span>
          </h2>
        </SR>
        <SR delay={0.1}>
          <p className="mt-6 text-[15px] text-white/20 max-w-[380px] mx-auto leading-[1.8]">
            Join thousands of developers shipping AI to production.
            Free to start, no credit card required.
          </p>
        </SR>
        <SR delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 bg-white text-black font-semibold text-[13.5px] px-7 py-3 rounded-xl transition-colors"
            >
              Get Started Free
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </motion.a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white/25 hover:text-white/50 text-[13.5px] font-medium px-6 py-3 rounded-xl border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-300"
            >
              Talk to Sales
            </a>
          </div>
        </SR>
      </div>
    </section>
  );
}
