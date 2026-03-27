"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const allTechs = [
  { name: "React",        short: "Re", cat: "Frontend", color: "#61dafb" },
  { name: "Next.js",      short: "Nx", cat: "Frontend", color: "#ffffff" },
  { name: "TypeScript",   short: "TS", cat: "Frontend", color: "#3178c6" },
  { name: "Tailwind CSS", short: "Tw", cat: "Frontend", color: "#38bdf8" },
  { name: "Framer Motion",short: "Fm", cat: "Frontend", color: "#bb4bff" },
  { name: "Node.js",      short: "No", cat: "Backend",  color: "#68a063" },
  { name: "Python",       short: "Py", cat: "Backend",  color: "#3776ab" },
  { name: "Express",      short: "Ex", cat: "Backend",  color: "#ffffff" },
  { name: "FastAPI",      short: "Fa", cat: "Backend",  color: "#009688" },
  { name: "GraphQL",      short: "Gq", cat: "Backend",  color: "#e535ab" },
  { name: "OpenAI",       short: "Oi", cat: "AI / ML",  color: "#ffffff" },
  { name: "LangChain",    short: "Lc", cat: "AI / ML",  color: "#4ade80" },
  { name: "TensorFlow",   short: "Tf", cat: "AI / ML",  color: "#ff6f00" },
  { name: "PyTorch",      short: "Pt", cat: "AI / ML",  color: "#ee4c2c" },
  { name: "Hugging Face", short: "Hf", cat: "AI / ML",  color: "#ffca28" },
  { name: "AWS",          short: "Aw", cat: "Infra",    color: "#ff9900" },
  { name: "Docker",       short: "Dk", cat: "Infra",    color: "#2496ed" },
  { name: "Vercel",       short: "Vc", cat: "Infra",    color: "#ffffff" },
  { name: "PostgreSQL",   short: "Pg", cat: "Infra",    color: "#336791" },
  { name: "MongoDB",      short: "Mg", cat: "Infra",    color: "#47a248" },
];

const statusServices = [
  { label: "API Gateway",     latency: "12ms"  },
  { label: "LLM Pipeline",    latency: "340ms" },
  { label: "DB Cluster",      latency: "4ms"   },
  { label: "Edge Functions",  latency: "8ms"   },
  { label: "Auth Service",    latency: "22ms"  },
];

const thinkingStates = ["Analyzing context...", "Synthesizing models...", "Executing plan...", "Calibrating output..."];

const bentoTechLayout = [
  { cat: "Frontend", colSpan: "md:col-span-2", label: "Frontend", count: 5 },
  { cat: "AI / ML",  colSpan: "md:col-span-1", label: "AI / ML",  count: 5 },
  { cat: "Backend",  colSpan: "md:col-span-1", label: "Backend",  count: 5 },
  { cat: "Infra",    colSpan: "md:col-span-2", label: "Infra",    count: 5 },
];

export default function TechStack() {
  const [thinkingIdx, setThinkingIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setThinkingIdx((i) => (i + 1) % thinkingStates.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.022]"
          style={{ background: "radial-gradient(circle, oklch(72% 0.22 250) 0%, transparent 55%)" }}
        />
        <div className="absolute inset-0 dot-bg opacity-50" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-12"
        >
          <p className="section-label mb-4">Our Arsenal</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text kinetic-text">
            20+ tools, one integrated stack
          </h2>
          <p className="mt-5 text-[16px] font-body text-white/70 max-w-[460px] mx-auto leading-[1.8]">
            Each technology chosen deliberately — for speed, reliability, or AI-native capability.
          </p>
        </motion.div>

        {/* Top functional tiles — Status + AI Inference */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">

          {/* System Status tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="bento-live p-6 md:col-span-1"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono text-white/78 uppercase tracking-[0.2em]">System Status</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-ping inline-block" />
                All systems nominal
              </span>
            </div>

            <div className="space-y-3">
              {statusServices.map((svc, i) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                      style={{ boxShadow: "0 0 6px oklch(78% 0.20 150 / 0.7)", animation: `status-ping ${1.8 + i * 0.3}s ease-in-out infinite` }}
                    />
                    <span className="text-[12px] font-mono text-white/82 group-hover:text-white/90 transition-colors">{svc.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/35">{svc.latency}</span>
                    <span className="text-[10px] font-mono text-emerald-400/60 bg-emerald-400/[0.08] border border-emerald-400/20 px-1.5 py-0.5 rounded-md">LIVE</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/35">30-day uptime</span>
              <span className="text-[14px] font-display font-bold gradient-text-neon">99.9%</span>
            </div>
          </motion.div>

          {/* AI Inference tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="bento-live p-6 md:col-span-2 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono text-white/78 uppercase tracking-[0.2em]">AI Inference Engine</span>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-[42px] font-display font-bold tracking-[-0.04em] gradient-text-neon">Dual</span>
                  <span className="text-[42px] font-display font-bold tracking-[-0.04em] text-white/20">Mind</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="thinking-dot w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: "0 0 8px oklch(72% 0.22 250 / 0.8)" }} />
                <div className="thinking-dot w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: "0 0 8px oklch(72% 0.22 250 / 0.8)" }} />
                <div className="thinking-dot w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: "0 0 8px oklch(72% 0.22 250 / 0.8)" }} />
              </div>
            </div>

            {/* Thinking state cycling */}
            <div className="flex-1 flex items-center">
              <div className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 font-mono text-[13px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white/30">$</span>
                  <span className="text-white/72">dml-inference</span>
                  <span className="text-white/20">›</span>
                </div>
                <motion.span
                  key={thinkingIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-blue-300/80"
                >
                  {thinkingStates[thinkingIdx]}
                </motion.span>
                <span className="inline-block w-[2px] h-[13px] bg-blue-400/70 ml-1 align-middle" style={{ animation: "pulse-soft 1s step-end infinite" }} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["System 1 — Intuitive", "System 2 — Structural", "Parallel Execution"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 text-[11px] font-mono border rounded-full"
                  style={{
                    borderColor: "oklch(72% 0.22 250 / 0.25)",
                    background: "oklch(72% 0.22 250 / 0.06)",
                    color: "oklch(80% 0.12 250)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech category bento cells */}
        <div className="grid md:grid-cols-3 gap-4">
          {bentoTechLayout.map((section, ci) => {
            const techs = allTechs.filter((t) => t.cat === section.cat);
            return (
              <motion.div
                key={section.cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: ci * 0.08, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className={`bento-cell p-6 md:p-7 ${section.colSpan}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-mono text-white/82 uppercase tracking-[0.2em]">{section.label}</span>
                  <span className="text-[10px] font-mono text-white/35 border border-white/[0.06] rounded-full px-2.5 py-0.5">
                    {section.count} tools
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {techs.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{
                        scale: 1.07,
                        y: -3,
                        boxShadow: `0 6px 20px -4px ${tech.color}30, 0 0 0 1px ${tech.color}22`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all cursor-pointer"
                    >
                      <div className="relative">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold"
                          style={{
                            background: `${tech.color}18`,
                            border: `1px solid ${tech.color}28`,
                            color: tech.color,
                          }}
                        >
                          {tech.short}
                        </div>
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                          style={{ background: `${tech.color}22` }}
                        />
                      </div>
                      <span className="text-[12px] font-body text-white/80 group-hover:text-white/92 transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee */}
        <div className="mt-10 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap py-3">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <span key={i} className="text-[13px] font-mono font-medium tracking-wider" style={{ color: `${tech.color}72` }}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
