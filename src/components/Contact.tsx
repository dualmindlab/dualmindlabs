"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.01] blur-[130px] pointer-events-none" />
      <div className="absolute top-[15%] right-[10%] w-[250px] h-[250px] rounded-full bg-white/[0.008] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[8%] w-[200px] h-[200px] rounded-full bg-white/[0.006] blur-[80px] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[700px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-14"
          style={{ perspective: "800px" }}
        >
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="section-heading text-[clamp(2.2rem,5.5vw,3.8rem)] gradient-text mb-5">
            Let&apos;s build something great
          </h2>
          <p className="text-[16px] font-body text-white/40 max-w-[460px] mx-auto leading-[1.8]">
            Have a project in mind? We&apos;d love to hear about it. Drop us a message and we&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          className="card-shadow rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-sm p-8 md:p-10 space-y-5 hover:border-white/[0.1] transition-all"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <label className="block text-[11px] font-mono text-white/35 uppercase tracking-[0.2em] mb-2.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3.5 text-[14px] font-body rounded-lg bg-white/[0.03] border border-white/[0.07] text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.2] focus:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-[11px] font-mono text-white/35 uppercase tracking-[0.2em] mb-2.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3.5 text-[14px] font-body rounded-lg bg-white/[0.03] border border-white/[0.07] text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.2] focus:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <label className="block text-[11px] font-mono text-white/35 uppercase tracking-[0.2em] mb-2.5">
              Project Type
            </label>
            <div className="flex flex-wrap gap-2">
              {["Website", "Mobile App", "AI Solution", "Custom Software", "Other"].map((type) => (
                <motion.button
                  key={type}
                  type="button"
                  whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-[12px] font-mono text-white/35 border border-white/[0.07] rounded-lg bg-white/[0.02] hover:text-white/55 transition-all cursor-pointer"
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="block text-[11px] font-mono text-white/35 uppercase tracking-[0.2em] mb-2.5">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full px-4 py-3.5 text-[14px] font-body rounded-lg bg-white/[0.03] border border-white/[0.07] text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.2] focus:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all resize-none"
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-white text-black font-body font-semibold text-[14px] py-3.5 rounded-xl transition-all duration-200"
          >
            Send Message
          </motion.button>

          <p className="text-center text-[12px] font-mono text-white/20">
            Or email directly at{" "}
            <a href="mailto:hello@dualmindlabs.com" className="text-white/35 hover:text-white/55 transition-colors underline underline-offset-2">
              hello@dualmindlabs.com
            </a>
          </p>
        </motion.form>
      </div>
    </section>
  );
}
