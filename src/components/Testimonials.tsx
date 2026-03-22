"use client";

import { motion } from "framer-motion";
import SR from "./ScrollReveal";

const items = [
  { quote: "Deploying NLP models went from weeks to minutes. The DX is genuinely unmatched.", name: "James Chen", role: "CTO, Arclight", grad: "from-indigo-500 to-blue-500" },
  { quote: "Cut infra costs 60% after migrating. Auto-scaling paid for itself in month one.", name: "Sofia Patel", role: "Head of ML, Synthwave", grad: "from-emerald-500 to-teal-500" },
  { quote: "Drift detection caught issues before users did. This level of visibility is rare.", name: "Alex Kim", role: "VP Eng, Vertex", grad: "from-amber-500 to-orange-500" },
  { quote: "Zero to production ML in a weekend. Best SDK and docs in AI infrastructure.", name: "Maria Rodriguez", role: "Founder, NeuralPath", grad: "from-cyan-500 to-blue-500" },
  { quote: "5M+ daily inferences, never missed an event. Infrastructure you can actually trust.", name: "David Lee", role: "Staff Eng, Helios", grad: "from-rose-500 to-pink-500" },
  { quote: "Best infra decision this year. Scientists focus on models, not deployment fights.", name: "Emma Nakamura", role: "Dir. of AI, Omnicorp", grad: "from-violet-500 to-purple-500" },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-5 border-b border-white/[0.03]">
      <div className="max-w-[1100px] mx-auto">
        <SR className="text-center mb-16">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em] mb-4">Testimonials</p>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.04em] gradient-text">
            Loved by engineering teams
          </h2>
        </SR>

        <div className="grid md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="group rounded-xl border border-white/[0.04] bg-[#080808]/60 p-6 hover:border-white/[0.08] hover:bg-[#0a0a0a] transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex gap-[3px] mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="11" height="11" viewBox="0 0 20 20" fill="#f59e0b" opacity="0.5">
                    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.28l-4.77 2.51.91-5.32L2.27 6.7l5.34-.78L10 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-[13px] text-white/30 leading-[1.8] mb-6 flex-1 group-hover:text-white/40 transition-colors">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.03]">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center text-[9px] font-bold text-white/90`}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[12px] font-medium text-white/60">{t.name}</div>
                  <div className="text-[10px] text-white/15">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
