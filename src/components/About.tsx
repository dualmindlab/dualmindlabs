"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const team = [
  {
    name: "Ashwin Hingve",
    systemLabel: "System 1 — Intuitive",
    role: "AI Engineer · Full-Stack · DevOps",
    bio: "Pattern-matching at machine speed. Ashwin wires generative AI into production systems before most engineers finish the PRD. His intuition for AI architecture, cloud pipelines, and UI/UX cuts weeks off every sprint.",
    skills: ["Generative AI", "LLMs", "Next.js/React", "Python", "DevOps", "CI/CD", "Docker", "UI/UX"],
    initials: "AH",
    chipBg: "rgba(139,92,246,0.12)",
    chipBorder: "rgba(139,92,246,0.3)",
    chipText: "rgba(167,139,250,1)",
    glowColor: "rgba(139,92,246,0.2)",
  },
  {
    name: "Mohit Sahu",
    systemLabel: "System 2 — Structural",
    role: "Backend Engineer · System Architect",
    bio: "Deliberate precision where it counts. Mohit architects the backend systems that keep your product standing when 10,000 users show up at once. He's the reason nothing breaks at scale.",
    skills: ["Node.js", "System Design", "REST/GraphQL APIs", "PostgreSQL", "MongoDB", "Cloud"],
    initials: "MS",
    chipBg: "rgba(34,211,238,0.08)",
    chipBorder: "rgba(34,211,238,0.25)",
    chipText: "rgba(103,232,249,1)",
    glowColor: "rgba(34,211,238,0.15)",
  },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const ashwinOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const ashwinX = useTransform(scrollYProgress, [0, 0.25], [-60, 0]);
  const mohitOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const mohitX = useTransform(scrollYProgress, [0.2, 0.45], [60, 0]);
  const connectorOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const connectorScaleX = useTransform(scrollYProgress, [0.55, 0.8], [0.4, 1]);

  return (
    <section ref={containerRef} id="about" className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Section background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-[300px] h-[300px] rounded-full bg-cyan-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">Why We Work</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text max-w-[620px] mx-auto">
            One studio. Two cognitive modes.
          </h2>
          <div className="aeo-block mt-6 max-w-[560px] mx-auto text-left">
            <p className="text-[17px] font-body text-white/80 leading-[1.85]">
              Nobel-winning research separates expert thinking into System 1 — fast, pattern-driven intuition — and System 2 — deliberate, structural reasoning. We built a studio around that duality. The result: AI-native products shipped fast, and engineered to last.
            </p>
          </div>
        </motion.div>

        {/* Team cards — scrollytelling */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Ashwin — System 1 */}
          <motion.div
            style={{ opacity: ashwinOpacity, x: ashwinX }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="card-glow bento-cell group rounded-2xl p-8 md:p-10 transition-all duration-400"
          >
            {/* System label chip */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-mono tracking-wide"
              style={{
                background: team[0].chipBg,
                border: `1px solid ${team[0].chipBorder}`,
                color: team[0].chipText,
                boxShadow: `0 0 12px ${team[0].glowColor}`,
              }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: team[0].chipText }} />
              {team[0].systemLabel}
            </div>

            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -3 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.25)",
                }}
              >
                <span className="text-[17px] font-display font-bold" style={{ color: team[0].chipText }}>
                  {team[0].initials}
                </span>
              </motion.div>
              <div>
                <h3 className="text-[18px] font-display font-semibold text-white/90 tracking-[-0.02em]">
                  {team[0].name}
                </h3>
                <p className="text-[14px] font-mono text-white/75 tracking-wide mt-0.5">
                  {team[0].role}
                </p>
              </div>
            </div>

            <p className="text-[17px] font-body text-white/82 leading-[1.8] mb-7 group-hover:text-white/80 transition-colors">
              {team[0].bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {team[0].skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 + si * 0.04 }}
                  whileHover={{ scale: 1.08 }}
                  className="px-3 py-1.5 text-[11px] font-mono text-white/75 border border-white/[0.06] rounded-md bg-white/[0.02] group-hover:border-white/[0.1] group-hover:text-white/82 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Mohit — System 2 */}
          <motion.div
            style={{ opacity: mohitOpacity, x: mohitX }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="card-glow bento-cell group rounded-2xl p-8 md:p-10 transition-all duration-400"
          >
            {/* System label chip */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-mono tracking-wide"
              style={{
                background: team[1].chipBg,
                border: `1px solid ${team[1].chipBorder}`,
                color: team[1].chipText,
                boxShadow: `0 0 12px ${team[1].glowColor}`,
              }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: team[1].chipText }} />
              {team[1].systemLabel}
            </div>

            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -3 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  background: "rgba(34,211,238,0.07)",
                  border: "1px solid rgba(34,211,238,0.2)",
                }}
              >
                <span className="text-[17px] font-display font-bold" style={{ color: team[1].chipText }}>
                  {team[1].initials}
                </span>
              </motion.div>
              <div>
                <h3 className="text-[18px] font-display font-semibold text-white/90 tracking-[-0.02em]">
                  {team[1].name}
                </h3>
                <p className="text-[14px] font-mono text-white/75 tracking-wide mt-0.5">
                  {team[1].role}
                </p>
              </div>
            </div>

            <p className="text-[17px] font-body text-white/82 leading-[1.8] mb-7 group-hover:text-white/80 transition-colors">
              {team[1].bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {team[1].skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 + si * 0.04 }}
                  whileHover={{ scale: 1.08 }}
                  className="px-3 py-1.5 text-[11px] font-mono text-white/75 border border-white/[0.06] rounded-md bg-white/[0.02] group-hover:border-white/[0.1] group-hover:text-white/82 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Connector — Dual Execution Engine */}
        <motion.div
          style={{ opacity: connectorOpacity, scaleX: connectorScaleX }}
          className="flex flex-col items-center mt-12 origin-center"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(139,92,246,0.8)", boxShadow: "0 0 10px rgba(139,92,246,0.5)" }}
            />
            <div className="w-20 md:w-28 h-px" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.4), rgba(139,92,246,0.1))" }} />
            <div className="text-[11px] font-mono text-white/72 tracking-[0.2em] uppercase">Dual Execution Engine</div>
            <div className="w-20 md:w-28 h-px" style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.1), rgba(34,211,238,0.4))" }} />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(34,211,238,0.8)", boxShadow: "0 0 10px rgba(34,211,238,0.5)" }}
            />
          </div>
          <p className="mt-5 text-[17px] font-body text-white/72 max-w-[500px] text-center leading-[1.8]">
            Together, we cover the entire stack — from the first LLM prompt to the last database migration — with zero handoff lag.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
