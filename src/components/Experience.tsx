"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

type Role = {
  company: string;
  title: string;
  periods: string[];
  current?: boolean;
  summary: string;
  bullets: { label?: string; text: string }[];
};

const roles: Role[] = [
  {
    company: "Dual Mind Labs",
    title: "Independent Full-Stack Developer",
    periods: ["May 2026 — Present"],
    current: true,
    summary:
      "Translate client requirements into scoped applications and own frontend, backend, integrations and deployment across concurrent freelance projects.",
    bullets: [
      {
        label: "Smart Shaadi · May–Sep 2026 · Pre-launch",
        text: "Built a near-complete matrimonial platform with profile matching, authentication, chat and payment integrations, plus a streaming AI assistant (tool calling, conversational memory) and semantic re-ranking on pgvector. Currently configured with dummy data ahead of commercial launch.",
      },
      {
        label: "PMStore, Colonel's Pickle, Gulaabi Clean",
        text: "Delivered live PMStore and Colonel's Pickle e-commerce websites; built separate customer and worker apps for Gulaabi Clean's home-service booking (in testing).",
      },
      {
        label: "Pulse Logic & Marksman · Client demonstrations",
        text: "Built Pulse Logic (web/Android/desktop, API medical-questions chatbot) and Marksman (web/Android, shooting AI coach with OpenCV target-hole detection) as client demonstrations.",
      },
    ],
  },
  {
    company: "SpaceAutoTech",
    title: "Full-Stack Developer",
    periods: ["Nov 2024 — May 2025", "Nov 2025 — Apr 2026"],
    summary:
      "Two engagements with the same company (with a break in between), delivering an industrial monitoring platform and client web products.",
    bullets: [
      {
        label: "WebSCADA",
        text: "Developed the final WebSCADA platform for device telemetry and browser-based monitoring using MQTT, Node.js, React and InfluxDB — including device state, dashboards and role-based access.",
      },
      {
        label: "TaptiFS",
        text: "Delivered a live food e-commerce website with authentication, Paytm integration, order tracking and administration.",
      },
      {
        label: "Deployment Corner",
        text: "Developed the hiring platform's job listings, applicant flow, résumé builder and administration.",
      },
    ],
  },
];

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="timeline-item"
    >
      {/* Node + line */}
      <div className="timeline-marker" aria-hidden>
        <span
          className="timeline-dot"
          style={{
            background: role.current
              ? "var(--color-accent-teal)"
              : "var(--color-bg-primary)",
            borderColor: "var(--color-accent-teal)",
          }}
        />
        <span className="timeline-line" />
      </div>

      {/* Content */}
      <div style={{ paddingBottom: "2.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "0.35rem",
          }}
        >
          {role.periods.map((p) => (
            <span
              key={p}
              className="text-mono-sm"
              style={{
                color: "var(--color-accent-teal)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.2rem 0.55rem",
              }}
            >
              {p}
            </span>
          ))}
          {role.current && (
            <span
              className="text-eyebrow"
              style={{ color: "var(--color-text-dim)" }}
            >
              Current
            </span>
          )}
        </div>

        <h3 className="text-h3" style={{ marginBottom: "0.1rem" }}>
          {role.title}
        </h3>
        <p
          className="text-body-sm"
          style={{
            color: "var(--color-text-primary)",
            fontWeight: 500,
            marginBottom: "0.85rem",
          }}
        >
          {role.company}
        </p>
        <p
          className="text-body-sm"
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "1.25rem",
            maxWidth: "640px",
          }}
        >
          {role.summary}
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
          }}
        >
          {role.bullets.map((b) => (
            <li key={b.text} style={{ display: "flex", gap: "0.7rem" }}>
              <span
                aria-hidden
                style={{ color: "var(--color-accent-teal)", flexShrink: 0 }}
              >
                →
              </span>
              <span>
                {b.label && (
                  <span
                    className="text-mono-sm"
                    style={{
                      display: "block",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {b.label}
                  </span>
                )}
                <span
                  className="text-body-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {b.text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <SectionLabel index="03" text="EXPERIENCE" />
        <div style={{ marginBottom: "3.5rem", maxWidth: "720px" }}>
          <h2 className="section-h2">
            Where I&apos;ve{" "}
            <span style={{ color: "var(--color-accent-teal)" }}>delivered</span>.
          </h2>
        </div>

        <div className="timeline">
          {roles.map((r, i) => (
            <RoleCard key={r.company} role={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
