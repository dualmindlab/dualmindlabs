"use client";

import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(6,201,168,0.05)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="text-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
            color: "var(--color-accent-teal)",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: "22px",
              height: "22px",
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
          AH <span style={{ color: "var(--color-text-dim)" }}>/</span>{" "}
          <span style={{ color: "var(--color-text-primary)" }}>DML</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-display"
          style={{
            color: "var(--color-text-primary)",
            marginBottom: "1rem",
          }}
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-body"
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "2rem",
            maxWidth: "32ch",
            marginInline: "auto",
          }}
        >
          This page doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.a
          href="/"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-mono hero-cta-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--color-accent-teal)",
            color: "var(--color-bg-primary)",
            padding: "0.95rem 1.6rem",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            fontWeight: 500,
            letterSpacing: "var(--ls-mono)",
            textTransform: "uppercase",
          }}
        >
          <span aria-hidden>←</span>
          Back to Home
        </motion.a>
      </motion.div>
    </main>
  );
}
