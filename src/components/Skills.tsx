"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

type Group = {
  label: string;
  color: string;
  skills: string[];
};

const groups: Group[] = [
  {
    label: "LANGUAGES",
    color: "var(--color-accent-teal)",
    skills: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    label: "WEB & BACKEND",
    color: "var(--color-accent-teal)",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "FastAPI",
      "REST APIs",
      "JWT / OAuth",
      "RBAC",
    ],
  },
  {
    label: "DATA & AI",
    color: "var(--color-accent-purple)",
    skills: [
      "PostgreSQL",
      "pgvector",
      "MongoDB",
      "Redis",
      "LLM APIs (Gemini / Claude)",
      "Embeddings",
      "Tool calling",
      "OpenCV",
    ],
  },
  {
    label: "DELIVERY",
    color: "var(--color-accent-amber)",
    skills: [
      "React Native",
      "Capacitor",
      "Tauri",
      "Git",
      "Docker",
      "Linux VPS",
      "Nginx",
      "PM2",
      "Vercel",
      "MQTT",
      "InfluxDB",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <SectionLabel index="04" text="SKILLS" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <h2 className="section-h2">
            The{" "}
            <span style={{ color: "var(--color-accent-teal)" }}>toolkit</span>.
          </h2>
          <p className="text-mono-sm" style={{ color: "var(--color-text-muted)" }}>
            Tools I&apos;ve shipped with.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="skills-grid"
        >
          {groups.map((g) => (
            <div key={g.label} className="skills-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span
                  aria-hidden
                  style={{ width: "6px", height: "6px", background: g.color }}
                />
                <p className="text-eyebrow" style={{ color: g.color }}>
                  {g.label}
                </p>
                <span
                  className="text-eyebrow"
                  style={{ marginLeft: "auto", color: "var(--color-text-muted)" }}
                >
                  {String(g.skills.length).padStart(2, "0")}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="text-mono-sm"
                    style={{
                      background: "var(--color-bg-primary)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.45rem 0.8rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
