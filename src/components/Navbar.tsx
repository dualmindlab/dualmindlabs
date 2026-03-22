"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060606]/80 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_1px_40px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-5 flex items-center justify-between h-[56px]">
        <a href="#" className="flex items-center gap-2.5 group relative">
          <Logo size={26} />
          <span className="text-[15px] font-semibold tracking-[-0.03em] text-white/90 group-hover:text-white transition-colors">
            Dual Mind Labs
          </span>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className="relative px-3.5 py-1.5 text-[13px] text-white/40 hover:text-white/90 transition-colors duration-200 rounded-md group"
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-indigo-500/50 group-hover:w-4/5 transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden sm:block text-[13px] text-white/40 hover:text-white/80 transition-colors px-3 py-1.5"
          >
            Log in
          </motion.a>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-[13px] font-medium bg-white text-black px-4 py-[7px] rounded-lg hover:bg-white/90 active:scale-[0.97] transition-all duration-200"
          >
            Get Started
          </motion.a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.4">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-white/[0.04] bg-[#060606]/95 backdrop-blur-2xl"
          >
            <div className="px-5 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[14px] text-white/40 hover:text-white/80 rounded-lg hover:bg-white/[0.03] transition-all"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
