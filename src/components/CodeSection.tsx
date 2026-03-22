"use client";

import { motion } from "framer-motion";
import SR from "./ScrollReveal";

export default function CodeSection() {
  return (
    <section id="docs" className="py-28 px-5 border-b border-white/[0.03]">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <SR><p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em] mb-4">Code-first</p></SR>
          <SR delay={0.08}>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.04em] leading-[1.08] gradient-text">
              Build with the<br />tools you love
            </h2>
          </SR>
          <SR delay={0.16}>
            <p className="mt-5 text-[15px] text-white/25 leading-[1.8] max-w-[380px]">
              Python endpoints, React dashboards, TypeScript orchestration. Your models, your language.
            </p>
          </SR>
          <SR delay={0.24}>
            <div className="mt-8 flex gap-3">
              {["Python", "TypeScript", "Go", "Rust"].map((lang, i) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 text-[10px] font-mono text-white/20 border border-white/[0.04] rounded-lg bg-white/[0.01] hover:bg-white/[0.03] hover:text-white/40 transition-all cursor-default"
                >
                  {lang}
                </span>
              ))}
            </div>
          </SR>
        </div>

        <SR delay={0.15}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-white/[0.04] bg-[#080808]/80 backdrop-blur-sm overflow-hidden shadow-[0_15px_50px_-15px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between px-4 py-[10px] border-b border-white/[0.04]">
              <div className="flex gap-[6px]">
                <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]/60" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]/60" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]/60" />
              </div>
              <span className="text-[10px] text-white/12 font-mono">pipeline.py</span>
              <span className="w-14" />
            </div>
            <div className="p-5 font-mono text-[12px] leading-[2.1] overflow-x-auto">
              <div className="code-line"><span className="text-indigo-400/70">from</span> <span className="text-white/40">dualmind</span> <span className="text-indigo-400/70">import</span> <span className="text-amber-300/60">Pipeline</span></div>
              <div className="code-line h-3" />
              <div className="code-line text-white/12"># ML pipeline in 10 lines</div>
              <div className="code-line"><span className="text-sky-400/60">pipe</span> <span className="text-white/15">=</span> <span className="text-amber-300/60">Pipeline</span><span className="text-white/12">(</span><span className="text-emerald-400/60">&quot;sentiment&quot;</span><span className="text-white/12">)</span></div>
              <div className="code-line h-3" />
              <div className="code-line"><span className="text-white/12">@</span><span className="text-sky-400/60">pipe</span><span className="text-white/12">.</span><span className="text-amber-300/60">step</span><span className="text-white/12">(</span><span className="text-emerald-400/60">&quot;clean&quot;</span><span className="text-white/12">)</span></div>
              <div className="code-line"><span className="text-indigo-400/70">def</span> <span className="text-sky-300/60">preprocess</span><span className="text-white/12">(</span><span className="text-white/30">text</span><span className="text-white/12">):</span></div>
              <div className="code-line">{"    "}<span className="text-indigo-400/70">return</span> <span className="text-white/30">text</span><span className="text-white/12">.</span><span className="text-sky-300/60">strip</span><span className="text-white/12">().</span><span className="text-sky-300/60">lower</span><span className="text-white/12">()</span></div>
              <div className="code-line h-3" />
              <div className="code-line"><span className="text-white/12">@</span><span className="text-sky-400/60">pipe</span><span className="text-white/12">.</span><span className="text-amber-300/60">step</span><span className="text-white/12">(</span><span className="text-emerald-400/60">&quot;predict&quot;</span><span className="text-white/12">,</span> <span className="text-white/30">gpu</span><span className="text-white/12">=</span><span className="text-amber-400/60">True</span><span className="text-white/12">)</span></div>
              <div className="code-line"><span className="text-indigo-400/70">def</span> <span className="text-sky-300/60">analyze</span><span className="text-white/12">(</span><span className="text-white/30">text</span><span className="text-white/12">):</span></div>
              <div className="code-line">{"    "}<span className="text-indigo-400/70">return</span> <span className="text-white/30">model</span><span className="text-white/12">.</span><span className="text-sky-300/60">predict</span><span className="text-white/12">(</span><span className="text-white/30">text</span><span className="text-white/12">)</span><span className="cursor-blink text-indigo-400/50 ml-0.5">▊</span></div>
            </div>
          </motion.div>
        </SR>
      </div>
    </section>
  );
}
