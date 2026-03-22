"use client";

import { motion } from "framer-motion";
import SR from "./ScrollReveal";

const plans = [
  {
    tier: "Free", price: "$0", per: "/mo", desc: "For experiments",
    features: ["1K inferences/day", "3 models", "Community support"],
    cta: "Get Started", highlight: false,
  },
  {
    tier: "Pro", price: "$49", per: "/mo", desc: "For growing teams",
    features: ["100K inferences/day", "Unlimited models", "GPU auto-scaling", "Priority support"],
    cta: "Get Started", highlight: true,
  },
  {
    tier: "Enterprise", price: "Custom", per: "", desc: "For scale",
    features: ["Unlimited everything", "Dedicated GPUs", "SSO & SAML", "99.99% SLA"],
    cta: "Contact Sales", highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-5 border-b border-white/[0.03] grid-bg">
      <div className="max-w-[1100px] mx-auto">
        <SR className="text-center mb-16">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em] mb-4">Pricing</p>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.04em] gradient-text">
            Simple pricing
          </h2>
          <p className="mt-4 text-[15px] text-white/20 max-w-[340px] mx-auto leading-[1.7]">
            Start free. Scale as you grow. No surprises.
          </p>
        </SR>

        <div className="grid md:grid-cols-3 gap-4 max-w-[880px] mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`relative rounded-xl bg-[#080808]/60 p-7 h-full flex flex-col transition-all duration-300 ${
                p.highlight
                  ? "border border-indigo-500/20 shadow-[0_0_50px_-15px_rgba(99,102,241,0.12)]"
                  : "border border-white/[0.04] hover:border-white/[0.08]"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[9px] font-bold uppercase tracking-[0.15em] shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                  Popular
                </div>
              )}
              <div className={`text-[10px] font-mono uppercase tracking-[0.25em] mb-5 ${p.highlight ? "text-indigo-400/70" : "text-white/15"}`}>
                {p.tier}
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[36px] font-bold tracking-[-0.04em] leading-none text-white/80">{p.price}</span>
                {p.per && <span className="text-[13px] text-white/15">{p.per}</span>}
              </div>
              <p className="text-[11px] text-white/15 mb-7">{p.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[12px] text-white/30">
                    <svg width="12" height="12" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24" className="opacity-60 flex-shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`block text-center text-[12.5px] font-semibold py-2.5 rounded-lg transition-all duration-200 active:scale-[0.97] ${
                  p.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/[0.06] text-white/40 hover:border-white/[0.12] hover:text-white/60 hover:bg-white/[0.02]"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
