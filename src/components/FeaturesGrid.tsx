"use client";

import { motion } from "framer-motion";
import SR from "./ScrollReveal";

const features = [
  { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Teams", desc: "RBAC, shared registries, collaborative workspaces.", color: "from-blue-500/20 to-indigo-500/20" },
  { icon: "M18 20V10M12 20V4M6 20v-6", title: "Analytics", desc: "Performance metrics, error rates, usage at a glance.", color: "from-emerald-500/20 to-green-500/20" },
  { icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", title: "Registry", desc: "Version, stage, deploy with automatic lineage.", color: "from-purple-500/20 to-violet-500/20" },
  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Security", desc: "SOC 2, encryption, GDPR ready, audit logs.", color: "from-amber-500/20 to-orange-500/20" },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Auto-scale", desc: "Zero to millions. GPU adapts to your traffic.", color: "from-cyan-500/20 to-blue-500/20" },
  { icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z", title: "Webhooks", desc: "Real-time events for training, drift, inference.", color: "from-pink-500/20 to-rose-500/20" },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-28 px-5 border-b border-white/[0.03] dot-bg">
      <div className="max-w-[1100px] mx-auto">
        <SR className="text-center mb-16">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em] mb-4">Capabilities</p>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.04em] gradient-text">
            Everything to ship AI
          </h2>
        </SR>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="card-glow group rounded-xl border border-white/[0.04] bg-[#080808]/60 p-7 transition-all duration-400 cursor-default hover:border-white/[0.08]"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-60 group-hover:opacity-90 transition-opacity">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="text-[14px] font-semibold mb-2 tracking-[-0.01em] text-white/80 group-hover:text-white transition-colors">{f.title}</h3>
              <p className="text-[12px] text-white/20 leading-[1.8] group-hover:text-white/30 transition-colors">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
