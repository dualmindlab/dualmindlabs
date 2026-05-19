"use client";

const navLinks = ["About", "Work", "Services", "Stack", "Contact"];
const EMAIL = "ashwin.hingave123@gmail.com";

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
          DUAL MIND LABS
        </div>
      </div>

      <div
        className="container grid-2 grid-2--footer"
        style={{
          padding: "0 2rem 2.5rem",
          gap: "3rem",
          alignItems: "start",
        }}
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
            Independent engineering practice building generative AI,
            autonomous agents, and computer-vision systems — from prototype to
            production.
          </p>
          <p
            className="text-mono-sm"
            style={{ color: "var(--color-text-dim)" }}
          >
            © 2026 Dual Mind Labs · Ashwin Hingve
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
                className="link-underline text-mono"
                style={{
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 150ms",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-teal)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right: contact */}
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
              marginBottom: "1rem",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
          >
            {EMAIL}
          </a>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <a
              href="https://github.com/ashwinhingve"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent-teal)";
                e.currentTarget.style.borderColor = "var(--color-accent-teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ashwinhingve"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent-teal)";
                e.currentTarget.style.borderColor = "var(--color-accent-teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
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
        <p
          className="text-mono-sm"
          style={{ color: "var(--color-text-dim)" }}
        >
          Built with Next.js · Deployed on Vercel · Madhya Pradesh, India
        </p>
      </div>
    </footer>
  );
}
