"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    title: "AEO-Optimized SaaS Architectures",
    desc: "We architect multi-tenant SaaS platforms optimized for Answer Engine visibility and semantic search. Your product gets cited by LLMs like ChatGPT and Perplexity — and converts when it does.",
    features: ["Next.js App Router", "Multi-tenant Architecture", "JSON-LD Schema", "Core Web Vitals 90+"],
    num: "01",
    accentColor: "rgba(139,92,246,0.2)",
    accentBorder: "rgba(139,92,246,0.15)",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Autonomous Multi-Agentic Workflows",
    desc: "We build AI systems that operate independently — LLM orchestration, tool-calling agents, RAG pipelines, and CRM-integrated assistants that work while your team sleeps.",
    features: ["LLM Orchestration", "RAG Pipelines", "Tool-calling Agents", "CRM Integration"],
    num: "02",
    accentColor: "rgba(99,102,241,0.18)",
    accentBorder: "rgba(99,102,241,0.12)",
  },
  {
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    title: "Revenue-Ready Mobile Products",
    desc: "Cross-platform mobile apps engineered for App Store approval and user retention. From onboarding to payment flow — every tap is intentional.",
    features: ["React Native", "Cross-Platform", "Push Notifications", "Stripe Integration"],
    num: "03",
    accentColor: "rgba(255,255,255,0.03)",
    accentBorder: "rgba(255,255,255,0.06)",
  },
  {
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    title: "Systems of Scale",
    desc: "Backend infrastructure, internal tooling, and automation systems that scale horizontally — designed for teams who've outgrown off-the-shelf solutions.",
    features: ["System Design", "REST/GraphQL APIs", "Automation Pipelines", "Event-Driven Architecture"],
    num: "04",
    accentColor: "rgba(255,255,255,0.03)",
    accentBorder: "rgba(255,255,255,0.06)",
  },
];

const serviceAnimations = [
  { x: -50, y: 0 },
  { x: 50, y: 0 },
  { x: 0, y: 50 },
  { x: 0, y: -40 },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-500/[0.04] blur-[140px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">What We Build</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text">
            Four ways we accelerate your roadmap
          </h2>
          <p className="mt-5 text-[17px] font-body text-white/80 max-w-[520px] mx-auto leading-[1.8]">
            Not a feature factory — a revenue-focused engineering partner. Every engagement is scoped to business outcomes, not deliverables.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => {
            const anim = serviceAnimations[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: anim.x, y: anim.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="bento-cell group p-8 relative overflow-hidden transition-all duration-300 cursor-default"
              >
                {/* Accent glow for AI services */}
                {(i === 0 || i === 1) && (
                  <div
                    className="absolute inset-0 rounded-[1.25rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at top left, ${service.accentColor} 0%, transparent 60%)` }}
                  />
                )}

                {/* Service number */}
                <span className="absolute top-6 right-7 text-[48px] font-display font-black text-white/[0.03] leading-none select-none group-hover:text-white/[0.06] transition-colors">
                  {service.num}
                </span>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 cursor-pointer"
                  style={{
                    background: i < 2 ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.04)",
                    border: i < 2 ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <svg width="22" height="22" fill="none" stroke={i < 2 ? "rgba(167,139,250,0.8)" : "white"} strokeWidth="1.3" viewBox="0 0 24 24"
                    className={i < 2 ? "" : "opacity-40 group-hover:opacity-75 transition-opacity"}>
                    <path d={service.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                <h3 className="text-[17px] font-display font-semibold text-white/90 tracking-[-0.02em] mb-3 group-hover:text-white transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-[17px] font-body text-white/80 leading-[1.85] mb-6 group-hover:text-white/70 transition-colors">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <motion.span
                      key={f}
                      whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-white/72 border border-white/[0.05] rounded-md bg-white/[0.015] group-hover:text-white/82 group-hover:border-white/[0.08] transition-all cursor-default"
                    >
                      <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="opacity-50">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
