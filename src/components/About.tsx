"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Ashwin Hingve",
    role: "AI Engineer / Developer / DevOps",
    bio: "2+ years building generative AI applications, full-stack development, and DevOps pipelines — from concept to production. Specializes in AI-powered products, modern UI design, CI/CD, and cloud infrastructure.",
    skills: ["Generative AI", "LLMs", "React/Next.js", "UI/UX", "Python", "DevOps", "CI/CD", "Docker"],
    initials: "AH",
  },
  {
    name: "Mohit Sahu",
    role: "Backend & Full-Stack Developer",
    bio: "Expert in building scalable backend systems, robust APIs, and managing end-to-end client communication. Turns complex requirements into reliable, production-ready software.",
    skills: ["Node.js", "APIs", "Databases", "System Design", "Full-Stack", "Cloud"],
    initials: "MS",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Section background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-white/[0.008] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-[300px] h-[300px] rounded-full bg-white/[0.006] blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">About Us</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text max-w-[600px] mx-auto">
            Two minds, one mission — building exceptional software
          </h2>
          <p className="mt-6 text-[16px] font-body text-white/40 max-w-[500px] mx-auto leading-[1.8]">
            We&apos;re a lean, focused team that combines AI expertise with full-stack engineering to deliver products that actually work.
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-glow card-shadow group rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/80 p-8 md:p-10 transition-all duration-400 hover:border-white/[0.12]"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 25px rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.9, rotate: -3 }}
                  className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center cursor-pointer"
                >
                  <span className="text-[17px] font-display font-bold text-white/70 group-hover:text-white/90 transition-colors">
                    {member.initials}
                  </span>
                </motion.div>
                <div>
                  <h3 className="text-[18px] font-display font-semibold text-white/90 tracking-[-0.02em]">
                    {member.name}
                  </h3>
                  <p className="text-[12px] font-mono text-white/35 tracking-wide mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[15px] font-body text-white/45 leading-[1.8] mb-7 group-hover:text-white/55 transition-colors">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 + si * 0.04 }}
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.06)" }}
                    className="px-3 py-1.5 text-[11px] font-mono text-white/35 border border-white/[0.06] rounded-md bg-white/[0.02] group-hover:border-white/[0.1] group-hover:text-white/45 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full border border-white/15" />
            <div className="w-24 h-px bg-gradient-to-r from-white/15 via-white/5 to-white/15" />
            <div className="text-[11px] font-mono text-white/25 tracking-wider">CONNECTED</div>
            <div className="w-24 h-px bg-gradient-to-r from-white/15 via-white/5 to-white/15" />
            <div className="w-2 h-2 rounded-full border border-white/15" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
