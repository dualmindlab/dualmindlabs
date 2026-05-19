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
import AITerminal from "./AITerminal";

const headlineWords: { text: string; color: string }[] = [
  { text: "I",          color: "var(--color-text-primary)" },
  { text: "build",      color: "var(--color-text-primary)" },
  { text: "AI",         color: "var(--color-accent-purple)" },
  { text: "systems",    color: "var(--color-text-primary)" },
  { text: "for",        color: "var(--color-text-primary)" },
  { text: "factories,", color: "var(--color-accent-teal)" },
  { text: "fleets,",    color: "var(--color-accent-amber)" },
  { text: "and",        color: "var(--color-text-primary)" },
  { text: "operations.",color: "var(--color-accent-teal)" },
];

const roles = [
  "AI systems engineer",
  "agent builder",
  "industrial AI dev",
  "indie shipper",
];

const tickerItems = [
  "OpenAI",
  "Anthropic",
  "LangChain",
  "Pinecone",
  "Vector DB",
  "RAG",
  "Agents",
  "Fine-tuning",
  "Vercel AI SDK",
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Docker",
  "ONNX",
  "YOLOv8",
];

const platforms = [
  "PulseLogic",
  "Smart Shaadi",
  "MarksmansPro",
  "TAPTIFS",
  "SpaceAutoTech",
];

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
  const orb1X = useTransform(spx, [-1, 1], [-30, 30]);
  const orb1Y = useTransform(spy, [-1, 1], [-20, 20]);
  const orb2X = useTransform(spx, [-1, 1], [35, -35]);
  const orb2Y = useTransform(spy, [-1, 1], [25, -25]);
  const panelTiltX = useTransform(spy, [-1, 1], [1.5, -1.5]);
  const panelTiltY = useTransform(spx, [-1, 1], [-2, 2]);

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
      2500
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
        justifyContent: "flex-start",
      }}
    >
      {/* Purple orb */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "5%",
          left: "-12%",
          width: "720px",
          height: "720px",
          background:
            "radial-gradient(circle, rgba(6,201,168,0.18), transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          x: orb1X,
          y: orb1Y,
        }}
      />
      {/* Teal orb */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "620px",
          height: "620px",
          background:
            "radial-gradient(circle, rgba(6,201,168,0.12), transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          x: orb2X,
          y: orb2Y,
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent, rgba(10,11,12,0.3), rgba(10,11,12,0.6))",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Scan line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(6,201,168,0.4), transparent)",
          animation: "scan-line 9s linear infinite",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
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
            gap: "4.5rem",
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
            {/* Status pill */}
            <motion.div variants={fadeUp} style={{ marginBottom: "2.25rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "0.4rem 0.9rem",
                  border: "1px solid rgba(34,197,94,0.25)",
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
                    background: "#22c55e",
                    animation: "pulse-dot 2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-eyebrow"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Accepting AI projects — Q2 2026
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={container}
              className="text-h1"
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.18em 0.28em",
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
                    style={{
                      display: "inline-block",
                      color: w.color,
                    }}
                  >
                    {w.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Role oscillator */}
            <motion.div
              variants={fadeUp}
              className="text-subhead"
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "1.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span>I&apos;m an</span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "200px",
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
              I ship{" "}
              <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                generative AI apps, autonomous agents, and computer-vision systems
              </span>
              {" "}— deployed to control rooms, ops dashboards, and customer
              apps. Currently live: a medical AI chatbot handling clinical
              intake and triage.
            </motion.p>

            {/* Meta */}
            <motion.p
              variants={fadeUp}
              className="text-mono-sm"
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "2.25rem",
              }}
            >
              Ashwin Hingve ·{" "}
              <span style={{ color: "var(--color-text-secondary)" }}>Madhya Pradesh, India</span> ·
              Remote-first
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: "0.85rem",
                flexWrap: "wrap",
                marginBottom: "3.25rem",
              }}
              className="hero-ctas"
            >
              <a
                href="#contact"
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
                  gap: "0.7rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Start a Project
                <span
                  style={{
                    display: "inline-flex",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "rgba(10,11,12,0.18)",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                  }}
                >
                  →
                </span>
              </a>
              <a
                href="#work"
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
                  gap: "0.7rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                See Recent Work
                <span style={{ opacity: 0.6 }}>↓</span>
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "1px",
                      background: "var(--color-accent-teal)",
                    }}
                  />
                  <span
                    className="text-eyebrow"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    CURRENTLY IN PRODUCTION
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    flexWrap: "wrap",
                    rowGap: "0.5rem",
                  }}
                >
                  {platforms.map((p) => (
                    <span
                      key={p}
                      className="text-mono"
                      style={{
                        color: "var(--color-text-primary)",
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Terminal panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hero-panel"
            style={{
              position: "relative",
              rotateX: panelTiltX,
              rotateY: panelTiltY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-25%",
                background:
                  "radial-gradient(circle, rgba(6,201,168,0.18), transparent 60%)",
                filter: "blur(50px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                background:
                  "linear-gradient(180deg, rgba(17,17,21,0.7), rgba(10,11,12,0.92))",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                padding: "1.25rem",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "0.85rem",
                  marginBottom: "1rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    className="text-eyebrow"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    agent_01 · streaming
                  </span>
                </div>
                <span
                  className="text-mono-sm"
                  style={{ color: "var(--color-text-dim)" }}
                >
                  gpt-4o
                </span>
              </div>

              {/* Terminal body */}
              <AITerminal />

              {/* Footer metrics */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.5rem",
                  paddingTop: "1rem",
                  marginTop: "1rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                {[
                  { label: "LATENCY", value: "240", unit: "ms", color: "var(--color-accent-teal)" },
                  { label: "TOKENS", value: "1.2", unit: "K", color: "var(--color-accent-teal)" },
                  { label: "COST", value: "$0.003", unit: "", color: "var(--color-accent-teal)" },
                ].map((m) => (
                  <div key={m.label}>
                    <p
                      className="text-eyebrow"
                      style={{ color: "var(--color-text-dim)", marginBottom: "0.2rem" }}
                    >
                      {m.label}
                    </p>
                    <p
                      className="text-mono"
                      style={{
                        fontWeight: 500,
                        color: m.color,
                        lineHeight: 1,
                      }}
                    >
                      {m.value}
                      {m.unit && (
                        <span
                          className="text-mono-sm"
                          style={{ color: "var(--color-text-dim)", marginLeft: "0.15rem" }}
                        >
                          {m.unit}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Corner brackets */}
              <CornerBracket position="top-left" />
              <CornerBracket position="top-right" />
              <CornerBracket position="bottom-left" />
              <CornerBracket position="bottom-right" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="marquee-wrapper"
        style={{
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          background:
            "linear-gradient(180deg, transparent, rgba(17,17,21,0.4), transparent)",
        }}
      >
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="text-h4"
              style={{
                color: i % 6 === 0 ? "var(--color-accent-teal)" : "var(--color-text-dim)",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "2.5rem",
              }}
            >
              {item}
              <span aria-hidden style={{ color: "var(--color-border)", fontSize: "0.7rem" }}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 4,
          textDecoration: "none",
        }}
        className="hero-scroll-hint"
      >
        <span
          className="text-eyebrow"
          style={{ color: "var(--color-text-muted)" }}
        >
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

function CornerBracket({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderColor: "var(--color-accent-teal)",
  };
  const map: Record<string, React.CSSProperties> = {
    "top-left": {
      top: -6,
      left: -6,
      borderTop: "1.5px solid",
      borderLeft: "1.5px solid",
    },
    "top-right": {
      top: -6,
      right: -6,
      borderTop: "1.5px solid",
      borderRight: "1.5px solid",
    },
    "bottom-left": {
      bottom: -6,
      left: -6,
      borderBottom: "1.5px solid",
      borderLeft: "1.5px solid",
    },
    "bottom-right": {
      bottom: -6,
      right: -6,
      borderBottom: "1.5px solid",
      borderRight: "1.5px solid",
    },
  };
  return <span aria-hidden style={{ ...base, ...map[position] }} />;
}
