"use client";

import { motion } from "framer-motion";
import SR from "./ScrollReveal";

const stacks = [
  { name: "Node.js", color: "#22c55e" },
  { name: "Python", color: "#3b82f6" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ededed" },
  { name: "Go", color: "#00add8" },
  { name: "Rust", color: "#f74c00" },
  { name: "Ruby", color: "#cc342d" },
  { name: "REST", color: "#8b5cf6" },
  { name: "gRPC", color: "#5bb974" },
  { name: "Docker", color: "#2496ed" },
  { name: "K8s", color: "#326ce5" },
];

export default function Integrations() {
  return (
    <section className="py-24 px-5 border-b border-white/[0.03]">
      <div className="max-w-[1100px] mx-auto">
        <SR className="text-center">
          <p className="text-[11px] text-white/20 uppercase tracking-[0.25em] font-medium mb-10">
            Works with your stack
          </p>
        </SR>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {stacks.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.03 }}
              className="flex items-center gap-2 px-3.5 py-[7px] rounded-lg border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.08] transition-colors duration-250 cursor-default"
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}33` }} />
              <span className="text-[11px] text-white/30 font-medium">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
