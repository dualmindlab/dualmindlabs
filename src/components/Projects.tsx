"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "AI-Powered Analytics Dashboard",
    desc: "Real-time data visualization platform with AI-driven insights for a SaaS startup. Built with Next.js and Python ML backend.",
    tags: ["Web App", "AI/ML", "Dashboard"],
    category: "Web",
    year: "2025",
  },
  {
    title: "E-Commerce Mobile App",
    desc: "Cross-platform mobile shopping experience with smart recommendations and seamless payments for a retail brand.",
    tags: ["Mobile", "React Native", "API"],
    category: "Mobile",
    year: "2025",
  },
  {
    title: "Healthcare Management System",
    desc: "Comprehensive web platform for appointment booking, patient records, and billing automation for a medical practice.",
    tags: ["Web App", "Full-Stack", "Database"],
    category: "Web",
    year: "2024",
  },
  {
    title: "AI Chatbot Platform",
    desc: "Custom conversational AI solution using LLMs for automated customer support, integrated with existing CRM systems.",
    tags: ["AI/ML", "LLM", "Integration"],
    category: "AI",
    year: "2025",
  },
  {
    title: "Restaurant Ordering App",
    desc: "Mobile application for in-restaurant ordering with real-time kitchen sync, table management, and payment processing.",
    tags: ["Mobile", "Real-time", "Payments"],
    category: "Mobile",
    year: "2024",
  },
  {
    title: "Desktop Inventory Manager",
    desc: "Cross-platform desktop application for warehouse inventory tracking with barcode scanning and automated reorder alerts.",
    tags: ["Desktop", "Electron", "Database"],
    category: "Desktop",
    year: "2024",
  },
];

const categories = ["All", "Web", "Mobile", "AI", "Desktop"];

const cardAnimations = [
  { x: -40, y: 0, rotate: -2 },
  { x: 40, y: 0, rotate: 2 },
  { x: 0, y: 40, rotate: 0 },
  { x: 0, y: -30, rotate: 1 },
  { x: -30, y: 20, rotate: -1 },
  { x: 30, y: 20, rotate: 1 },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Section backgrounds */}
      <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />
      <div className="absolute top-[15%] left-0 w-[350px] h-[350px] rounded-full bg-white/[0.008] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-[300px] h-[300px] rounded-full bg-white/[0.006] blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-6"
        >
          <p className="section-label mb-4">Portfolio</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text">
            Selected work
          </h2>
          <p className="mt-5 text-[16px] font-body text-white/40 max-w-[440px] mx-auto leading-[1.8]">
            A curated selection of projects we&apos;ve shipped for startups and businesses.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-14 flex-wrap"
        >
          {categories.map((cat, i) => (
            <motion.span
              key={cat}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-[7px] text-[12px] font-mono rounded-lg border cursor-pointer transition-all duration-200 ${
                i === 0
                  ? "border-white/[0.15] bg-white/[0.05] text-white/60"
                  : "border-white/[0.06] bg-transparent text-white/30 hover:border-white/[0.12] hover:text-white/50"
              }`}
            >
              {cat}
            </motion.span>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const anim = cardAnimations[i % cardAnimations.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: anim.x, y: anim.y, rotate: anim.rotate }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: false, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card-glow card-shadow group rounded-xl border border-white/[0.06] bg-[#0a0a0a]/70 p-7 flex flex-col transition-all duration-300 hover:border-white/[0.12] cursor-default"
              >
                {/* Preview */}
                <div className="w-full h-[140px] rounded-lg bg-gradient-to-br from-white/[0.03] to-white/[0.008] border border-white/[0.04] mb-6 flex items-center justify-center overflow-hidden group-hover:border-white/[0.08] group-hover:shadow-[inset_0_1px_20px_rgba(255,255,255,0.02)] transition-all duration-300">
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.15 }}
                      className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.2" viewBox="0 0 24 24" className="opacity-30 group-hover:opacity-60 transition-opacity">
                        <path d="M4 17l6-6-6-6M12 19h8" />
                      </svg>
                    </motion.div>
                    <span className="text-[10px] font-mono text-white/20 tracking-wider">{project.category.toUpperCase()}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-white/25">{project.year}</span>
                  <span className="text-[11px] font-mono text-white/25">{project.category}</span>
                </div>

                <h3 className="text-[16px] font-display font-semibold text-white/85 tracking-[-0.02em] mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-[14px] font-body text-white/35 leading-[1.8] mb-5 flex-1 group-hover:text-white/45 transition-colors">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-[4px] text-[10px] font-mono text-white/30 border border-white/[0.06] rounded-md bg-white/[0.02] group-hover:text-white/40 group-hover:border-white/[0.08] transition-all"
                    >
                      {tag}
                    </span>
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
