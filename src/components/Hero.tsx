"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RESUME_PATH } from "@/lib/site";

const headlineWords: { text: string; color: string }[] = [
  { text: "Full-stack", color: "var(--color-accent-teal)" },
  { text: "platforms.", color: "var(--color-text-primary)" },
  { text: "Applied", color: "var(--color-accent-purple)" },
  { text: "AI.", color: "var(--color-text-primary)" },
];

const roles = [
  "full-stack engineer",
  "Next.js + Node.js developer",
  "applied-AI builder",
  "end-to-end client delivery",
];

type SelectedWork = {
  name: string;
  status: string;
  tone: "live" | "pre" | "offline";
  tags: string[];
};

const selectedWork: SelectedWork[] = [
  {
    name: "Smart Shaadi",
    status: "Pre-launch",
    tone: "pre",
    tags: ["Next.js", "AI assistant", "pgvector"],
  },
  {
    name: "WebSCADA",
    status: "Frontend live · backend offline",
    tone: "offline",
    tags: ["MQTT", "React", "InfluxDB"],
  },
  {
    name: "PMStore",
    status: "Live",
    tone: "live",
    tags: ["Next.js", "Node.js", "Payments"],
  },
];

const toneColor: Record<SelectedWork["tone"], string> = {
  live: "var(--color-accent-teal)",
  pre: "var(--color-accent-amber)",
  offline: "var(--color-text-muted)",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const wordVariant: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spx = useSpring(mx, { stiffness: 50, damping: 20 });
  const spy = useSpring(my, { stiffness: 50, damping: 20 });
  const orb1X = useTransform(spx, [-1, 1], [-24, 24]);
  const orb1Y = useTransform(spy, [-1, 1], [-16, 16]);
  const orb2X = useTransform(spx, [-1, 1], [28, -28]);
  const orb2Y = useTransform(spy, [-1, 1], [20, -20]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx.set((e.clientX - cx) / (rect.width / 2));
      my.set((e.clientY - cy) / (rect.height / 2));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const interval = setInterval(
      () => setRoleIdx((i) => (i + 1) % roles.length),
      2800
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        minHeight: "100svh",
        position: "relative",
        overflow: "hidden",
        padding: 0,
        borderTop: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Soft ambient orbs (restrained) */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          left: "-12%",
          width: "640px",
          height: "640px",
          background:
            "radial-gradient(circle, rgba(6,201,168,0.14), transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          x: orb1X,
          y: orb1Y,
        }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-12%",
          right: "-10%",
          width: "560px",
          height: "560px",
          background:
            "radial-gradient(circle, rgba(194,164,255,0.10), transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          x: orb2X,
          y: orb2Y,
        }}
      />

      <div
        style={{
          width: "100%",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div
          className="hero-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ maxWidth: "820px" }}
          >
            {/* Availability pill */}
            <motion.div variants={fadeUp} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  padding: "0.4rem 0.9rem",
                  border: "1px solid rgba(6,201,168,0.3)",
                  background: "rgba(17,17,21,0.5)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "999px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "var(--color-accent-teal)",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-eyebrow"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Open to full-stack &amp; applied-AI roles
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={container}
              className="text-h1 hero-heading"
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.16em 0.26em",
              }}
            >
              {headlineWords.map((w, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    paddingBottom: "0.08em",
                  }}
                >
                  <motion.span
                    variants={wordVariant}
                    style={{ display: "inline-block", color: w.color }}
                  >
                    {w.text}
                  </motion.span>{i < headlineWords.length - 1 ? " " : null}
                </span>
              ))}
            </motion.h1>

            {/* Role rotator */}
            <motion.div
              variants={fadeUp}
              className="text-subhead"
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span>Ashwin Hingve —</span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "250px",
                  height: "1.4em",
                  overflow: "hidden",
                  verticalAlign: "middle",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--color-accent-teal)",
                      fontWeight: 500,
                      letterSpacing: "var(--ls-default)",
                    }}
                  >
                    {roles[roleIdx]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-body-lg"
              style={{
                color: "var(--color-text-secondary)",
                maxWidth: "600px",
                marginBottom: "1rem",
                fontWeight: 400,
              }}
            >
              I build and ship web platforms for e-commerce, matrimonial services
              and industrial IoT — owning architecture, development, integrations
              and deployment. I add applied-AI features with LLM APIs, tool calling,
              semantic search and OpenCV.
            </motion.p>

            {/* Meta */}
            <motion.p
              variants={fadeUp}
              className="text-mono-sm"
              style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}
            >
              Bhopal, India ·{" "}
              <span style={{ color: "var(--color-text-secondary)" }}>
                Remote &amp; on-site
              </span>{" "}
              · TypeScript · Next.js · Node.js · Applied AI
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="hero-ctas"
              style={{
                display: "flex",
                gap: "0.85rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="#work"
                className="text-mono hero-cta-primary"
                style={{
                  fontWeight: 500,
                  background: "var(--color-accent-teal)",
                  color: "var(--color-bg-primary)",
                  padding: "1rem 1.8rem",
                  textDecoration: "none",
                  letterSpacing: "var(--ls-mono)",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                View projects <span aria-hidden>↓</span>
              </a>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono hero-cta-secondary"
                style={{
                  fontWeight: 500,
                  background: "transparent",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                  padding: "1rem 1.6rem",
                  textDecoration: "none",
                  letterSpacing: "var(--ls-mono)",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Résumé <span aria-hidden>↗</span>
              </a>
              <a
                href="#contact"
                className="link-underline text-mono-sm"
                style={{
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "var(--ls-mono)",
                  textTransform: "uppercase",
                  padding: "0.5rem 0.25rem",
                }}
              >
                Contact
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Selected-work board (honest) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hero-panel"
            style={{ position: "relative" }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-20%",
                background:
                  "radial-gradient(circle, rgba(6,201,168,0.12), transparent 60%)",
                filter: "blur(50px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                background:
                  "linear-gradient(180deg, rgba(17,17,21,0.75), rgba(10,11,12,0.92))",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "1rem",
                  marginBottom: "1.1rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span
                  className="text-eyebrow"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Selected work
                </span>
                <span
                  className="text-mono-sm"
                  style={{ color: "var(--color-text-dim)" }}
                >
                  2024 — 2026
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {selectedWork.map((w) => (
                  <div
                    key={w.name}
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.9rem 1rem",
                      background: "rgba(10,11,12,0.4)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <span
                        className="text-body-sm"
                        style={{ color: "var(--color-text-primary)", fontWeight: 600 }}
                      >
                        {w.name}
                      </span>
                      <span
                        className="text-eyebrow"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          color: toneColor[w.tone],
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: toneColor[w.tone],
                            flexShrink: 0,
                          }}
                        />
                        {w.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {w.tags.map((t) => (
                        <span
                          key={t}
                          className="text-mono-sm"
                          style={{
                            fontSize: "0.72rem",
                            background: "var(--color-bg-primary)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius-sm)",
                            padding: "0.2rem 0.5rem",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#work"
                className="link-underline text-eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginTop: "1.2rem",
                  color: "var(--color-accent-teal)",
                  textDecoration: "none",
                }}
              >
                See all projects <span aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 4,
          textDecoration: "none",
        }}
        className="hero-scroll-hint"
        aria-label="Scroll to about section"
      >
        <span className="text-eyebrow" style={{ color: "var(--color-text-muted)" }}>
          scroll
        </span>
        <div
          style={{
            width: "18px",
            height: "28px",
            border: "1px solid var(--color-text-muted)",
            borderRadius: "9px",
            position: "relative",
          }}
        >
          <div
            className="scroll-hint-dot"
            style={{
              position: "absolute",
              top: "5px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              height: "6px",
              background: "var(--color-accent-teal)",
              borderRadius: "2px",
            }}
          />
        </div>
      </motion.a>
    </section>
  );
}
