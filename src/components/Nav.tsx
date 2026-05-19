"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, var(--color-accent-teal), var(--color-accent-amber))",
          zIndex: 101,
          pointerEvents: "none",
        }}
      />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 250ms, border-color 250ms, backdrop-filter 250ms",
          background: scrolled ? "rgba(10,11,12,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="text-mono"
            style={{
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                border: "1.5px solid var(--color-accent-teal)",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: "3px",
                  background: "var(--color-accent-teal)",
                  opacity: 0.35,
                }}
              />
            </span>
            <span style={{ color: "var(--color-accent-teal)" }}>AH</span>
            <span style={{ color: "var(--color-text-dim)" }}>/</span>
            <span>DML</span>
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{
              gap: "0.3rem",
              alignItems: "center",
              background: scrolled ? "transparent" : "rgba(17,17,21,0.4)",
              border: scrolled ? "1px solid transparent" : "1px solid var(--color-border)",
              borderRadius: "999px",
              padding: "0.3rem",
              transition: "background 250ms, border-color 250ms",
            }}
          >
            {links.map(({ href, label }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  className="text-mono-sm nav-link"
                  data-active={isActive ? "true" : undefined}
                  style={{
                    position: "relative",
                    textTransform: "uppercase",
                    letterSpacing: "var(--ls-mono)",
                    textDecoration: "none",
                    padding: "0.55rem 0.95rem",
                    borderRadius: "var(--radius-pill)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(6,201,168,0.12)",
                        border: "1px solid rgba(6,201,168,0.4)",
                        borderRadius: "999px",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span style={{ position: "relative" }}>{label}</span>
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex text-mono-sm hero-cta-primary"
            style={{
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "var(--ls-mono)",
              color: "var(--color-bg-primary)",
              background: "var(--color-accent-teal)",
              padding: "0.75rem 1.2rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Start a Project <span>→</span>
          </a>

          {/* Hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-primary)",
              minWidth: "44px",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
              {mobileOpen ? (
                <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <>
                  <rect x="3" y="6" width="16" height="1.5" rx="0.5" />
                  <rect x="3" y="11" width="16" height="1.5" rx="0.5" />
                  <rect x="3" y="16" width="16" height="1.5" rx="0.5" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(10,11,12,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid var(--color-border)",
              padding: "1.5rem 2rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-mono"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "var(--ls-mono)",
                  color:
                    activeSection === href.slice(1) ? "var(--color-accent-teal)" : "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="text-mono"
              style={{
                textTransform: "uppercase",
                letterSpacing: "var(--ls-mono)",
                color: "var(--color-bg-primary)",
                background: "var(--color-accent-teal)",
                padding: "0.85rem 1.2rem",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                display: "inline-block",
                marginTop: "0.5rem",
                textAlign: "center",
              }}
            >
              Start a Project →
            </a>
          </motion.div>
        )}
      </nav>
    </>
  );
}
