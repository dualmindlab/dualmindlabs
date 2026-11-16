"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import SocialLinks from "./SocialLinks";
import { EMAIL } from "@/lib/site";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-bg-primary)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text-primary)",
  padding: "0.95rem 1rem",
  fontFamily: "var(--font-geist-sans)",
  fontSize: "var(--text-body)",
  letterSpacing: "var(--ls-default)",
  borderRadius: "var(--radius-sm)",
  transition: "border-color 150ms, background 150ms",
};

const inputFocusCss = `
  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: var(--color-accent-teal);
    outline: none;
  }
`;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio enquiry${form.name ? ` — ${form.name}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email || "N/A"}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" style={{ position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(6,201,168,0.08), transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <SectionLabel index="05" text="CONTACT" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-h2"
          style={{ marginBottom: "3rem" }}
        >
          Let&apos;s{" "}
          <span style={{ color: "var(--color-accent-teal)" }}>work together</span>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid-2"
        >
          {/* Left */}
          <div>
            <p
              className="text-body"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
                marginBottom: "2.5rem",
              }}
            >
              I&apos;m open to full-stack and applied-AI roles — remote or
              on-site — and to freelance projects.
              <br />
              <br />
              If you&apos;re hiring or have something you want built, send a note
              with a few details and I&apos;ll get back to you.
            </p>

            {/* Email card */}
            <div
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-card)",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <p
                className="text-eyebrow"
                style={{ color: "var(--color-text-dim)", marginBottom: "0.5rem" }}
              >
                DIRECT EMAIL
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-underline text-mono"
                  style={{
                    fontSize: "var(--text-body)",
                    color: "var(--color-accent-teal)",
                    textDecoration: "none",
                    wordBreak: "break-all",
                  }}
                >
                  {EMAIL}
                </a>
                <button
                  onClick={handleCopy}
                  className="text-eyebrow"
                  style={{
                    color: copied ? "var(--color-accent-success)" : "var(--color-text-secondary)",
                    background: "transparent",
                    border: `1px solid ${copied ? "var(--color-accent-success)" : "var(--color-border)"}`,
                    borderRadius: "var(--radius-sm)",
                    padding: "0.5rem 0.85rem",
                    cursor: "pointer",
                    transition: "all 150ms",
                  }}
                >
                  {copied ? "✓ COPIED" : "COPY"}
                </button>
              </div>
            </div>

            {/* Response time */}
            <div
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-card)",
                padding: "1.5rem",
                marginBottom: "2rem",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--color-accent-success)",
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  className="text-eyebrow"
                  style={{ color: "var(--color-text-dim)", marginBottom: "0.3rem" }}
                >
                  RESPONSE TIME
                </p>
                <p
                  className="text-body-sm"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Usually within 24 hours · IST
                </p>
              </div>
            </div>

            <SocialLinks includeEmail />
          </div>

          {/* Right: form */}
          <style>{inputFocusCss}</style>
          <form
            onSubmit={handleSubmit}
            className="contact-form"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-card)",
              height: "fit-content",
            }}
          >
            <p
              className="text-eyebrow"
              style={{ color: "var(--color-text-dim)", marginBottom: "0.5rem" }}
            >
              SEND A MESSAGE
            </p>
            <FormField label="Name">
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </FormField>
            <FormField label="Email">
              <input
                type="email"
                placeholder="you@company.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
            </FormField>
            <FormField label="Message">
              <textarea
                placeholder="A line about the role or project..."
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </FormField>
            <button
              type="submit"
              className="text-mono"
              style={{
                width: "100%",
                background: "var(--color-accent-teal)",
                color: "var(--color-bg-primary)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                padding: "1.05rem",
                fontWeight: 500,
                letterSpacing: "var(--ls-mono)",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "transform 200ms, box-shadow 200ms",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-glow-teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Send message →
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "block" }}>
      <span
        className="text-eyebrow"
        style={{
          color: "var(--color-text-secondary)",
          marginBottom: "0.4rem",
          display: "block",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
