"use client";

import SocialLinks from "./SocialLinks";
import { EMAIL } from "@/lib/site";

const navLinks = ["About", "Work", "Experience", "Skills", "Contact"];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(180deg, transparent, rgba(17,17,21,0.4))",
      }}
    >
      {/* Huge wordmark */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 2rem 2rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          className="text-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(3rem, 14vw, 11rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            background:
              "linear-gradient(180deg, rgba(240,240,242,0.08) 0%, transparent 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            userSelect: "none",
          }}
        >
          ASHWIN HINGVE
        </div>
      </div>

      <div
        className="container grid-2 grid-2--footer"
        style={{ padding: "0 2rem 2.5rem", gap: "3rem", alignItems: "start" }}
      >
        {/* Left */}
        <div>
          <div
            className="text-mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <span
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
            <span style={{ color: "var(--color-accent-teal)" }}>AH</span>
            <span style={{ color: "var(--color-text-dim)" }}>/</span>
            <span style={{ color: "var(--color-text-primary)" }}>DML</span>
          </div>
          <p
            className="text-body-sm"
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: "320px",
              marginBottom: "1.25rem",
            }}
          >
            Full-stack engineer. I build web platforms and applied-AI features,
            end to end — from requirements to deployment. Dual Mind Labs is the
            name I use for my independent work.
          </p>
          <p className="text-mono-sm" style={{ color: "var(--color-text-dim)" }}>
            © 2026 Ashwin Hingve
          </p>
        </div>

        {/* Center: nav */}
        <div>
          <p
            className="text-eyebrow"
            style={{ color: "var(--color-text-dim)", marginBottom: "1rem" }}
          >
            NAVIGATION
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="link-underline text-mono footer-link"
                style={{
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  width: "fit-content",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right: connect */}
        <div>
          <p
            className="text-eyebrow"
            style={{ color: "var(--color-text-dim)", marginBottom: "1rem" }}
          >
            CONNECT
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="link-underline text-mono"
            style={{
              color: "var(--color-text-primary)",
              textDecoration: "none",
              display: "block",
              marginBottom: "1.25rem",
              wordBreak: "break-all",
            }}
          >
            {EMAIL}
          </a>
          <SocialLinks includeEmail={false} />
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "1rem 0",
          textAlign: "center",
        }}
      >
        <p className="text-mono-sm" style={{ color: "var(--color-text-dim)" }}>
          Built with Next.js · Deployed on Vercel · Bhopal, India
        </p>
      </div>
    </footer>
  );
}
