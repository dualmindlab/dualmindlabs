"use client";

import { motion } from "framer-motion";

const allTechs = [
  // Frontend
  { name: "React", short: "Re", cat: "Frontend", color: "#61dafb" },
  { name: "Next.js", short: "Nx", cat: "Frontend", color: "#ffffff" },
  { name: "TypeScript", short: "TS", cat: "Frontend", color: "#3178c6" },
  { name: "Tailwind CSS", short: "Tw", cat: "Frontend", color: "#38bdf8" },
  { name: "Framer Motion", short: "Fm", cat: "Frontend", color: "#bb4bff" },
  // Backend
  { name: "Node.js", short: "No", cat: "Backend", color: "#68a063" },
  { name: "Python", short: "Py", cat: "Backend", color: "#3776ab" },
  { name: "Express", short: "Ex", cat: "Backend", color: "#ffffff" },
  { name: "FastAPI", short: "Fa", cat: "Backend", color: "#009688" },
  { name: "GraphQL", short: "Gq", cat: "Backend", color: "#e535ab" },
  // AI/ML
  { name: "OpenAI", short: "Oi", cat: "AI / ML", color: "#ffffff" },
  { name: "LangChain", short: "Lc", cat: "AI / ML", color: "#4ade80" },
  { name: "TensorFlow", short: "Tf", cat: "AI / ML", color: "#ff6f00" },
  { name: "PyTorch", short: "Pt", cat: "AI / ML", color: "#ee4c2c" },
  { name: "Hugging Face", short: "Hf", cat: "AI / ML", color: "#ffca28" },
  // Infra
  { name: "AWS", short: "Aw", cat: "Infra", color: "#ff9900" },
  { name: "Docker", short: "Dk", cat: "Infra", color: "#2496ed" },
  { name: "Vercel", short: "Vc", cat: "Infra", color: "#ffffff" },
  { name: "PostgreSQL", short: "Pg", cat: "Infra", color: "#336791" },
  { name: "MongoDB", short: "Mg", cat: "Infra", color: "#47a248" },
];

const categories = ["Frontend", "Backend", "AI / ML", "Infra"];

const catAnimations = [
  { initial: { opacity: 0, x: -60, rotate: -2 }, label: "Frontend" },
  { initial: { opacity: 0, y: 50, rotate: 1 }, label: "Backend" },
  { initial: { opacity: 0, x: 60, rotate: 2 }, label: "AI / ML" },
  { initial: { opacity: 0, y: -40, rotate: -1 }, label: "Infra" },
];

export default function TechStack() {
  return (
    <section className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Section background — radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.025]" style={{ background: "radial-gradient(circle, #fff 0%, transparent 60%)" }} />
        <div className="absolute inset-0 dot-bg opacity-60" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">Tech Stack</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text">
            Tools we use
          </h2>
          <p className="mt-5 text-[16px] font-body text-white/45 max-w-[460px] mx-auto leading-[1.8]">
            Modern technologies chosen for reliability, performance, and developer experience.
          </p>
        </motion.div>

        {/* Category rows */}
        <div className="space-y-6">
          {categories.map((cat, ci) => {
            const techs = allTechs.filter((t) => t.cat === cat);
            const anim = catAnimations[ci];
            return (
              <motion.div
                key={cat}
                initial={anim.initial}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: false, margin: "-30px" }}
                transition={{ delay: ci * 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-2xl border border-white/[0.05] bg-[#0a0a0a]/60 backdrop-blur-sm p-6 md:p-7 card-shadow hover:border-white/[0.1] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  {/* Category label */}
                  <div className="sm:w-[100px] shrink-0">
                    <span className="text-[11px] font-mono text-white/40 uppercase tracking-[0.2em]">{cat}</span>
                  </div>

                  {/* Tech pills — no individual opacity animation to avoid double-invisible */}
                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech) => (
                      <motion.div
                        key={tech.name}
                        whileHover={{
                          scale: 1.08,
                          y: -4,
                          boxShadow: `0 8px 25px -5px ${tech.color}20, 0 0 0 1px ${tech.color}30`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer"
                      >
                        {/* Icon circle with color glow */}
                        <div className="relative">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold transition-all duration-300"
                            style={{
                              background: `${tech.color}15`,
                              border: `1px solid ${tech.color}25`,
                              color: `${tech.color}`,
                            }}
                          >
                            {tech.short}
                          </div>
                          {/* Glow on hover */}
                          <div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                            style={{ background: `${tech.color}20` }}
                          />
                        </div>
                        <span className="text-[13px] font-body text-white/60 group-hover:text-white/90 transition-colors">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated orbital ring decoration */}
        <div className="relative mt-16 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-white/[0.02]"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[140px] h-[140px] rounded-full border border-white/[0.03]"
          >
            {/* Orbiting dot */}
            <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-white/25" style={{ boxShadow: "0 0 10px rgba(255,255,255,0.2)" }} />
          </motion.div>

          {/* Center text */}
          <div className="relative z-20 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 150 }}
              className="text-[52px] font-display font-bold text-white"
            >
              20+
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-[13px] font-mono text-white/45 uppercase tracking-[0.2em]"
            >
              Technologies
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-10 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap py-3">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <span key={i} className="text-[13px] font-mono font-medium tracking-wider" style={{ color: `${tech.color}70` }}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
