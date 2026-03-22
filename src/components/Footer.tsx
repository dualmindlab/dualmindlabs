"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Model Deployment", href: "#" },
      { label: "Inference API", href: "#" },
      { label: "Pipeline Builder", href: "#" },
      { label: "Monitoring", href: "#" },
      { label: "Auto-scaling", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "SDKs", href: "#" },
      { label: "CLI", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Community", href: "#" },
      { label: "Open Source", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Security", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
];

const socials = [
  { label: "X", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "GitHub", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { label: "LinkedIn", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "YouTube", d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { label: "Discord", d: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963a.075.075 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028z" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] pt-20 pb-10 px-5">
      <div className="max-w-[1100px] mx-auto">
        {/* Top: newsletter + nav */}
        <div className="grid lg:grid-cols-[1.5fr_3fr] gap-16 mb-16">
          {/* Brand + newsletter */}
          <div>
            <a href="#" className="inline-flex items-center gap-2.5 group mb-5">
              <Logo size={24} />
              <span className="text-[14px] font-semibold tracking-[-0.03em] text-white/80 group-hover:text-white transition-colors">
                Dual Mind Labs
              </span>
            </a>
            <p className="text-[12px] text-white/15 leading-[1.8] max-w-[260px] mb-6">
              Production-grade AI infrastructure for developers. Build, deploy, and scale intelligent systems.
            </p>
            {/* Mini newsletter */}
            <div className="flex gap-2 max-w-[280px]">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-3 py-[7px] text-[11px] rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/60 placeholder:text-white/15 outline-none focus:border-indigo-500/30 transition-colors"
              />
              <button className="px-3 py-[7px] text-[11px] font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white/50 rounded-lg border border-white/[0.04] transition-all active:scale-[0.97]">
                Subscribe
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-white/15 hover:text-white/40 hover:border-white/[0.08] hover:bg-white/[0.04] transition-all"
                  aria-label={s.label}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-[10px] font-semibold text-white/40 mb-4 uppercase tracking-[0.2em]">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[11.5px] text-white/15 hover:text-white/40 transition-colors duration-200 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="glow-line mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/10">
            &copy; {new Date().getFullYear()} Dual Mind Labs, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[11px] text-white/10 hover:text-white/25 transition-colors">Privacy</a>
            <a href="#" className="text-[11px] text-white/10 hover:text-white/25 transition-colors">Terms</a>
            <a href="#" className="text-[11px] text-white/10 hover:text-white/25 transition-colors">Sitemap</a>
            <span className="text-[11px] text-white/8">San Francisco, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
