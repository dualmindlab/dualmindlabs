"use client";

import { motion } from "framer-motion";
import SR from "./ScrollReveal";

const rows = [
  { id: "mdl_a7f3c", action: "deployed", ms: "12ms" },
  { id: "inf_d4e1b", action: "completed", ms: "8ms" },
  { id: "bat_92ca1", action: "processed", ms: "23ms" },
  { id: "pip_f0e8d", action: "running", ms: "5ms" },
  { id: "mdl_b3c6a", action: "scaled", ms: "3ms" },
];

export default function DevExperience() {
  return (
    <section className="py-28 px-5 border-b border-white/[0.03]">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <SR>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em] mb-4">Developer Experience</p>
          </SR>
          <SR delay={0.08}>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.04em] leading-[1.08] gradient-text">
              Built for speed<br />and reliability
            </h2>
          </SR>
          <SR delay={0.16}>
            <p className="mt-5 text-[15px] text-white/25 leading-[1.8] max-w-[380px]">
              Every API call returns in milliseconds. Monitor latency, track performance, scale with confidence.
            </p>
          </SR>
          <SR delay={0.24}>
            <div className="mt-6 flex items-center gap-6">
              <div className="text-center">
                <div className="text-[28px] font-bold tracking-tight gradient-text-accent">99.99%</div>
                <div className="text-[10px] text-white/15 mt-1 uppercase tracking-wider">Uptime</div>
              </div>
              <div className="w-px h-10 bg-white/[0.04]" />
              <div className="text-center">
                <div className="text-[28px] font-bold tracking-tight gradient-text-accent">&lt;15ms</div>
                <div className="text-[10px] text-white/15 mt-1 uppercase tracking-wider">Avg Latency</div>
              </div>
              <div className="w-px h-10 bg-white/[0.04]" />
              <div className="text-center">
                <div className="text-[28px] font-bold tracking-tight gradient-text-accent">50+</div>
                <div className="text-[10px] text-white/15 mt-1 uppercase tracking-wider">Regions</div>
              </div>
            </div>
          </SR>
        </div>

        <SR delay={0.15}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-white/[0.04] bg-[#080808]/80 backdrop-blur-sm p-5 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ animation: "pulse-soft 2s infinite" }} />
              <span className="text-[9px] text-white/15 uppercase tracking-[0.25em] font-mono">Live Inference</span>
            </div>
            <div className="space-y-[5px]">
              {rows.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="status-row flex items-center justify-between py-[8px] px-3 rounded-lg bg-white/[0.015] border border-white/[0.02] hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-400/70 text-[10px] font-mono font-semibold w-6">200</span>
                    <span className="text-[10px] text-white/20 font-mono">{r.id}</span>
                  </div>
                  <span className="text-[9.5px] text-white/12 font-mono">→ {r.action}</span>
                  <span className="text-[9.5px] text-white/12 font-mono tabular-nums">{r.ms}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SR>
      </div>
    </section>
  );
}
