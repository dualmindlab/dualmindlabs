"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Dual Mind Labs delivered our AI dashboard in record time. The attention to detail and technical depth was impressive — they understood our data pipeline on day one.",
    name: "Rahul Verma",
    role: "CTO, DataSync",
    type: "text" as const,
  },
  {
    quote: "We needed a mobile app that could handle high traffic during sales events. They built something rock-solid — zero downtime during our biggest launch ever.",
    name: "Priya Sharma",
    role: "Founder, ShopEase",
    type: "text" as const,
  },
  {
    quote: "Their AI integration transformed our customer support. Response times dropped 70% and customer satisfaction went through the roof. Highly recommend.",
    name: "Amit Patel",
    role: "Head of Product, NexGen",
    type: "text" as const,
  },
  {
    quote: "Clean code, clear communication, and they actually ship on time. After working with three other agencies, Dual Mind Labs was a breath of fresh air.",
    name: "Sarah Chen",
    role: "VP Engineering, CloudBase",
    type: "text" as const,
  },
  {
    quote: "The desktop inventory system they built has saved our warehouse team hours every day. The barcode integration works flawlessly. Exceeded our expectations.",
    name: "Vikram Singh",
    role: "Operations Lead, Warehouz",
    type: "text" as const,
  },
  {
    quote: "From concept to App Store in 8 weeks. They handled everything — design, development, backend, and deployment. A truly full-stack team.",
    name: "Neha Gupta",
    role: "Founder, FitTrack",
    type: "video" as const,
  },
];

const testimonialAnimations = [
  { x: -30, y: 20, rotate: -1 },
  { x: 0, y: 40, rotate: 0 },
  { x: 30, y: 20, rotate: 1 },
  { x: 20, y: -30, rotate: 0.5 },
  { x: -20, y: 30, rotate: -0.5 },
  { x: 0, y: -40, rotate: 0 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Background */}
      <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-white/[0.006] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[8%] w-[300px] h-[300px] rounded-full bg-white/[0.008] blur-[100px] pointer-events-none" />
      {/* Decorative quote marks */}
      <div className="absolute top-24 left-[10%] text-[200px] font-display font-black text-white/[0.015] leading-none select-none pointer-events-none">&ldquo;</div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Testimonials</p>
          <h2 className="section-heading text-[clamp(2rem,4.5vw,3.2rem)] gradient-text">
            What clients say
          </h2>
          <p className="mt-5 text-[16px] font-body text-white/40 max-w-[420px] mx-auto leading-[1.8]">
            Don&apos;t just take our word for it — hear from the teams we&apos;ve worked with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const anim = testimonialAnimations[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: anim.x, y: anim.y, rotate: anim.rotate }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: false, margin: "-20px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="card-glow card-shadow group rounded-xl border border-white/[0.06] bg-[#0a0a0a]/60 p-7 hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col"
              >
                {/* Video indicator */}
                {t.type === "video" && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-full h-[100px] rounded-lg bg-white/[0.03] border border-white/[0.05] mb-5 flex items-center justify-center group-hover:bg-white/[0.05] group-hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] transition-all"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-11 h-11 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.2] transition-all"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white" fillOpacity="0.4" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}

                {/* Stars */}
                <div className="flex gap-[3px] mb-5">
                  {[...Array(5)].map((_, j) => (
                    <motion.svg
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.07 + j * 0.05, type: "spring", stiffness: 300 }}
                      width="13" height="13" viewBox="0 0 20 20" className="text-amber-400/50"
                    >
                      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.28l-4.77 2.51.91-5.32L2.27 6.7l5.34-.78L10 1z" fill="currentColor" />
                    </motion.svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[14px] font-body text-white/40 leading-[1.85] mb-6 flex-1 group-hover:text-white/55 transition-colors">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[10px] font-display font-bold text-white/50"
                  >
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </motion.div>
                  <div>
                    <div className="text-[13px] font-body font-medium text-white/65">{t.name}</div>
                    <div className="text-[11px] font-mono text-white/25">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
