"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const categories = [
  {
    label: "AI / LLM",
    color: "var(--color-accent-purple)",
    tools: [
      "OpenAI",
      "Anthropic",
      "LangChain",
      "LlamaIndex",
      "Vercel AI SDK",
      "HuggingFace",
      "Ollama",
    ],
  },
  {
    label: "VECTOR / RAG",
    color: "var(--color-accent-purple)",
    tools: ["Pinecone", "Weaviate", "pgvector", "Chroma", "Qdrant"],
  },
  {
    label: "AI / CV",
    color: "var(--color-accent-purple)",
    tools: ["YOLOv8", "ONNX Runtime", "OpenCV", "PyTorch", "scikit-learn"],
  },
  {
    label: "FRONTEND",
    color: "var(--color-accent-teal)",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "BACKEND",
    color: "var(--color-accent-teal)",
    tools: ["Node.js", "Python", "FastAPI", "Express"],
  },
  {
    label: "DATABASES",
    color: "var(--color-accent-teal)",
    tools: ["PostgreSQL", "MongoDB", "Redis", "InfluxDB"],
  },
  {
    label: "IoT / PROTOCOL",
    color: "var(--color-accent-amber)",
    tools: ["MQTT", "Sparkplug B", "ESP32", "LoRaWAN", "ChirpStack"],
  },
  {
    label: "MOBILE",
    color: "var(--color-accent-teal)",
    tools: ["React Native", "Expo", "Capacitor"],
  },
  {
    label: "INFRASTRUCTURE",
    color: "var(--color-accent-amber)",
    tools: ["Docker", "Vercel", "AWS", "GitHub Actions", "Nginx"],
  },
  {
    label: "PAYMENTS",
    color: "var(--color-accent-amber)",
    tools: ["Razorpay", "Paytm API", "Stripe", "Shiprocket API"],
  },
];

const allTools = categories.flatMap((c) => c.tools);

function ToolChip({ label, color }: { label: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-mono-sm"
      style={{
        background: hovered ? `${color}14` : "var(--color-bg-primary)",
        border: `1px solid ${hovered ? color : "var(--color-border)"}`,
        borderRadius: "var(--radius-sm)",
        padding: "0.5rem 0.95rem",
        color: hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        transition: "all 200ms",
        cursor: "default",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      <span
        style={{
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: color,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 200ms",
        }}
      />
      {label}
    </span>
  );
}

export default function Stack() {
  return (
    <section id="stack">
      <div className="container">
        <SectionLabel index="05" text="STACK" />
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
            The <span style={{ color: "var(--color-accent-teal)" }}>tools</span>.
          </h2>
          <p
            className="text-mono-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            AI-forward. Picked for production.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="marquee-wrapper"
        style={{
          padding: "1.5rem 0",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          background:
            "linear-gradient(180deg, transparent, rgba(17,17,21,0.3), transparent)",
          marginBottom: "4rem",
        }}
      >
        <div className="marquee-track">
          {[...allTools, ...allTools].map((t, i) => (
            <span
              key={i}
              className="text-h4"
              style={{
                color: "var(--color-text-dim)",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              {t}
              <span aria-hidden style={{ color: "var(--color-border)", fontSize: "0.8rem" }}>
                ◆
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.label}
              style={{
                padding: "1.5rem",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
              }}
            >
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
                  style={{
                    width: "6px",
                    height: "6px",
                    background: cat.color,
                  }}
                />
                <p
                  className="text-eyebrow"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </p>
                <span
                  className="text-eyebrow"
                  style={{ marginLeft: "auto", color: "var(--color-text-muted)" }}
                >
                  {String(cat.tools.length).padStart(2, "0")}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {cat.tools.map((t) => (
                  <ToolChip key={t} label={t} color={cat.color} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
