"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Logo from "./Logo";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Track active section via IntersectionObserver
  const setupObserver = useCallback(() => {
    const sectionIds = ["about", "projects", "services", "testimonials", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    const cleanup = setupObserver();
    return () => {
      window.removeEventListener("scroll", fn);
      cleanup();
    };
  }, [setupObserver]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/40 via-white/60 to-white/40 z-[60] origin-left"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[64px]">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 group relative"
          >
            <motion.div
              whileHover={{ rotate: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Logo size={26} />
            </motion.div>
            <span className="text-[15px] font-display font-semibold tracking-[-0.02em] text-white/90 group-hover:text-white transition-colors">
              Dual Mind Labs
            </span>
          </motion.a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-0.5 bg-white/[0.02] rounded-xl px-1.5 py-1 border border-white/[0.04]">
            {links.map((l, i) => {
              const isActive = activeSection === l.href;
              return (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3.5 py-1.5 text-[13px] font-body rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-[0_0_12px_rgba(255,255,255,0.04)]"
                      : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08]"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 25px rgba(255,255,255,0.1), 0 4px 15px rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.94 }}
              className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium font-body bg-white text-black px-5 py-2 rounded-lg transition-all duration-200"
            >
              Get in Touch
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform"
              >
                <path d="M5 12h14m-6-6l6 6-6 6" />
              </motion.svg>
            </motion.a>

            {/* Mobile toggle */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-md hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.5">
                {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/[0.04] bg-black/90 backdrop-blur-2xl"
            >
              <div className="px-6 py-4 space-y-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.97, x: 4 }}
                    className={`block px-3 py-3 text-[15px] font-body rounded-lg transition-all ${
                      activeSection === l.href
                        ? "text-white/90 bg-white/[0.05]"
                        : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                    }`}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-3 text-center text-[14px] font-medium bg-white text-black px-4 py-3 rounded-lg"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
