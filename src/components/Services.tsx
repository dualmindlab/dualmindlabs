"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    title: "Web Development",
    desc: "Modern, responsive websites and web applications built with Next.js, React, and scalable backend architectures. From landing pages to complex SaaS platforms.",
    features: ["Next.js / React", "Responsive Design", "CMS Integration", "Performance Optimized"],
    num: "01",
  },
  {
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    title: "Mobile Development",
    desc: "Cross-platform mobile applications that feel native. We build fast, intuitive apps with seamless API integration and offline support.",
    features: ["React Native", "Cross-Platform", "Push Notifications", "App Store Ready"],
    num: "02",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "AI-Powered Solutions",
    desc: "Generative AI integration, custom LLM applications, intelligent automation, and AI-driven features that give your product a competitive edge.",
    features: ["LLM Integration", "Custom AI Models", "Chatbots", "Data Analysis"],
    num: "03",
  },
  {
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    title: "Custom Software",
    desc: "Tailored software solutions for unique business needs. Desktop applications, internal tools, automation systems, and everything in between.",
    features: ["Desktop Apps", "Automation", "Internal Tools", "API Development"],
    num: "04",
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.008] blur-[120px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Services</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text">
            What we do
          </h2>
          <p className="mt-5 text-[16px] font-body text-white/40 max-w-[460px] mx-auto leading-[1.8]">
            End-to-end development services, from idea to deployment and beyond.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
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
                className="card-glow card-shadow group rounded-xl border border-white/[0.06] bg-[#0a0a0a]/60 p-8 transition-all duration-300 hover:border-white/[0.12] relative"
              >
                {/* Service number */}
                <span className="absolute top-6 right-7 text-[48px] font-display font-black text-white/[0.03] leading-none select-none group-hover:text-white/[0.06] transition-colors">
                  {service.num}
                </span>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 8, boxShadow: "0 0 30px rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6 group-hover:bg-white/[0.07] group-hover:border-white/[0.1] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-300 cursor-pointer"
                >
                  <svg width="22" height="22" fill="none" stroke="white" strokeWidth="1.3" viewBox="0 0 24 24" className="opacity-40 group-hover:opacity-75 transition-opacity">
                    <path d={service.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                <h3 className="text-[18px] font-display font-semibold text-white/90 tracking-[-0.02em] mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                <p className="text-[14px] font-body text-white/40 leading-[1.8] mb-6 group-hover:text-white/50 transition-colors">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <motion.span
                      key={f}
                      whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-white/30 border border-white/[0.05] rounded-md bg-white/[0.015] group-hover:text-white/45 group-hover:border-white/[0.08] transition-all cursor-default"
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
