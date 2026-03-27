"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";
import { MagneticButton } from "./MagneticButton";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AEO-Optimized SaaS", href: "#services" },
      { label: "Agentic Workflows", href: "#services" },
      { label: "Mobile Products", href: "#services" },
      { label: "Systems of Scale", href: "#services" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: "mailto:hello@dualmindlabs.com" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Twitter / X", href: "#" },
    ],
  },
];

const socials = [
  { label: "X", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "GitHub", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { label: "LinkedIn", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-white/[0.008] blur-[120px]" />
        <div className="absolute top-0 left-[20%] w-[300px] h-[300px] rounded-full bg-white/[0.005] blur-[80px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="relative rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-sm p-10 md:p-14 text-center mb-16 card-shadow overflow-hidden"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/[0.08] rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/[0.08] rounded-br-2xl" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[11px] font-mono text-white/80 uppercase tracking-[0.25em] mb-4"
          >
            Ready to build something that scales?
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-display font-bold text-white tracking-[-0.03em] mb-4"
          >
            Let&apos;s build something ambitious
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[17px] font-body text-white/80 max-w-[440px] mx-auto leading-[1.8] mb-8"
          >
            We&apos;re always excited to work on ambitious products. Drop us a line and let&apos;s build.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <MagneticButton strength={0.3}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 bg-white text-black font-semibold font-body text-[14px] px-7 py-3.5 rounded-xl transition-all"
              >
                Start a Project
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </motion.a>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <motion.a
                href="mailto:hello@dualmindlabs.com"
                whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white/80 font-body text-[14px] font-medium px-6 py-3.5 rounded-xl border border-white/[0.08] transition-all"
              >
                hello@dualmindlabs.com
              </motion.a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Main footer grid */}
        <div className="grid md:grid-cols-[1.5fr_2.5fr] gap-14 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2.5 group mb-5"
            >
              <motion.div whileHover={{ rotate: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Logo size={26} />
              </motion.div>
              <span className="text-[16px] font-display font-semibold tracking-[-0.02em] text-white/90 group-hover:text-white transition-colors">
                Dual Mind Labs
              </span>
            </motion.a>
            <p className="text-[17px] font-body text-white/80 leading-[1.8] max-w-[300px] mb-7">
              AI-native dev studio building AEO-optimized SaaS architectures and autonomous multi-agentic workflows.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  whileHover={{
                    y: -4,
                    scale: 1.15,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.15)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/72 hover:text-white/70 transition-all"
                  aria-label={s.label}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: si * 0.1, duration: 0.5 }}
              >
                <h4 className="text-[11px] font-mono font-semibold text-white/70 mb-5 uppercase tracking-[0.2em]">
                  {section.title}
                </h4>
                <ul className="space-y-3.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 4 }}
                        className="text-[17px] font-body text-white/75 hover:text-white/70 transition-colors duration-200 inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-white/40 transition-all duration-300" />
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="glow-line mb-8" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[14px] font-mono text-white/68">
            &copy; {new Date().getFullYear()} Dual Mind Labs. All rights reserved.
          </p>

          {/* Back to top */}
          <div className="flex items-center gap-6">
            <p className="text-[11px] font-mono text-white/32">
              Designed & built by Ashwin & Mohit
            </p>
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.1, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/72 hover:text-white/80 hover:border-white/[0.12] transition-all"
              aria-label="Back to top"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 15l7-7 7 7" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
