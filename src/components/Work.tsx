"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import ProjectMedia from "./ProjectMedia";

type MediaType = "image" | "video" | "placeholder";

type Project = {
  id: string;
  num: string;
  status: "LIVE" | "IN DEVELOPMENT" | "CURRENTLY BUILDING";
  flagship?: boolean;
  name: string;
  headline: string;
  client: string;
  year: string;
  url: string | null;
  category: string;
  problem: string;
  built: string;
  stack: string[];
  accent: string;
  media?: {
    type: MediaType;
    src?: string;
    poster?: string;
  };
};

const projects: Project[] = [
  {
    id: "spaceautotech",
    num: "01",
    status: "LIVE",
    name: "SpaceAutoTech WebSCADA Platform",
    headline: "Industrial IoT & WebSCADA Platform",
    client: "Industrial Automation",
    year: "2024–2025",
    url: "https://iot.spaceautotech.com",
    category: "IoT / Full-Stack",
    problem:
      "Remote industrial sites needed real-time monitoring over GPRS with zero software infrastructure.",
    built:
      "A complete WebSCADA stack: MQTT/Sparkplug B, InfluxDB time-series, ESP32 firmware, LoRaWAN via TTN, and a live Next.js dashboard with RBAC, OMS, ticketing, and SSO.",
    stack: [
      "MQTT",
      "InfluxDB",
      "ESP32",
      "LoRaWAN",
      "Next.js",
      "Node.js",
      "PostgreSQL",
    ],
    accent: "var(--color-accent-teal)",
    media: {
      type: "image",
      src: "/media/spaceautotech.jpg",
    },
  },
  {
    id: "marksmanspro",
    num: "02",
    status: "IN DEVELOPMENT",
    name: "MarksmansPro Shooting Analysis",
    headline: "YOLOv8 Computer Vision for Shooting Analysis",
    client: "Defence / Sports Technology",
    year: "2025",
    url: "https://marksmanspro.com",
    category: "Computer Vision",
    problem:
      "ISSF shooting ranges had no automated way to score targets — manual measurement was slow, inconsistent, and blocked performance analysis.",
    built:
      "A CV pipeline that detects bullet holes (YOLOv8 + ONNX Runtime), applies ISSF decimal scoring, analyzes shot grouping, and feeds an AI coach that builds a training plan per shooter.",
    stack: [
      "YOLOv8",
      "ONNX Runtime",
      "OpenCV",
      "Next.js",
      "FastAPI",
      "PostgreSQL",
    ],
    accent: "var(--color-accent-teal)",
    media: {
      type: "image",
      src: "/media/marksmanspro.jpg",
    },
  },
  {
    id: "pulselogic",
    num: "03",
    status: "LIVE",
    flagship: true,
    name: "PulseLogic Army Medical Platform",
    headline: "Medical AI Platform with Clinical AI Chatbot",
    client: "Healthcare / Defence-Adjacent",
    year: "2024–2025",
    url: "https://pulse-six-kappa.vercel.app",
    category: "Medical AI",
    problem:
      "Medical management ran on manual records — no audit trail, no clinical decision support, and no AI-assisted triage for operators who needed fast answers.",
    built:
      "A full-stack medical platform with an AI symptom-triage chatbot, doctor-to-doctor messaging, X-ray and ECG analysis, a case library, RBAC admin, and billing — all live in production.",
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "FastAPI",
      "OpenAI",
      "RAG",
      "RBAC",
    ],
    accent: "var(--color-accent-teal)",
    media: {
      type: "image",
      src: "/media/pulselogic.jpg",
    },
  },
  {
    id: "taptifs",
    num: "04",
    status: "LIVE",
    name: "TAPTIFS E-Commerce Platform",
    headline: "Full-Stack E-Commerce Platform",
    client: "Consumer / Food & Spices",
    year: "2024",
    url: "https://taptifs.com",
    category: "Full-Stack",
    problem:
      "A Madhya Pradesh food & spices brand needed a full online retail presence with Indian payments and logistics infrastructure.",
    built:
      "Full product catalogue, SMS OTP + Google SSO, Paytm payment gateway, Shiprocket logistics, order tracking, and a complete admin dashboard.",
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Paytm API",
      "Shiprocket API",
    ],
    accent: "var(--color-accent-teal)",
    media: {
      type: "image",
      src: "/media/taptifs.jpg",
    },
  },
  {
    id: "smart-shaadi",
    num: "05",
    status: "CURRENTLY BUILDING",
    name: "Smart Shaadi",
    headline: "AI-First National Matrimony Platform",
    client: "Consumer / SaaS",
    year: "2025–2026",
    url: null,
    category: "Gen AI + Web Platform",
    problem:
      "Every major matrimony platform is crippled by fake profiles, low-trust messaging, and generic matching. Users churn fast.",
    built:
      "Aadhaar KYC, Reciprocal Matching, Guna Milan engine, multilingual chat, vendor marketplace, escrow payments — plus 6 AI features including conversation coaching, churn prediction, and LLM-powered compatibility analysis.",
    stack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Razorpay",
      "OpenAI",
      "React Native",
    ],
    accent: "var(--color-accent-teal)",
    media: {
      type: "image",
      src: "/media/smart-shaadi.jpg",
    },
  },
];

function statusStyle(status: Project["status"]) {
  if (status === "LIVE") {
    return {
      bg: "rgba(6,201,168,0.1)",
      color: "var(--color-accent-teal)",
      border: "rgba(6,201,168,0.35)",
      solid: false,
    };
  }
  if (status === "IN DEVELOPMENT") {
    return {
      bg: "rgba(6,201,168,0.1)",
      color: "var(--color-accent-teal)",
      border: "rgba(6,201,168,0.35)",
      solid: false,
    };
  }
  return {
    bg: "transparent",
    color: "var(--color-text-secondary)",
    border: "var(--color-text-dim)",
    solid: true,
  };
}

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 1;
  const badge = statusStyle(project.status);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`feature-strip${isEven ? " reverse" : ""}`}
      style={{
        paddingBottom: "1rem",
      }}
    >
      {/* Media */}
      <div style={{ position: "relative" }}>
        <ProjectMedia
          type={project.media?.type}
          src={project.media?.src}
          poster={project.media?.poster}
          alt={`${project.name} — ${project.headline}`}
          accent={project.accent}
          category={project.category}
        />
        {project.flagship && (
          <div
            className="text-eyebrow"
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "rgba(232,145,42,0.12)",
              border: "1px solid rgba(232,145,42,0.5)",
              color: "var(--color-accent-amber)",
              padding: "0.35rem 0.7rem",
              borderRadius: "var(--radius-sm)",
              backdropFilter: "blur(8px)",
              zIndex: 2,
            }}
          >
            ★ Flagship
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1rem",
            marginBottom: "0.85rem",
            flexWrap: "wrap",
          }}
        >
          <span
            className="text-h2"
            style={{ color: project.accent }}
          >
            {project.num}
          </span>
          <span
            className="text-eyebrow"
            style={{
              padding: "0.3rem 0.6rem",
              borderRadius: "var(--radius-sm)",
              background: badge.bg,
              color: badge.color,
              border: `1px ${badge.solid ? "dashed" : "solid"} ${badge.border}`,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            {!badge.solid && (
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: badge.color,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
            )}
            {project.status}
          </span>
          <span
            className="text-mono-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {project.category} · {project.year}
          </span>
        </div>

        <h3
          className="text-h3"
          style={{ marginBottom: "0.4rem" }}
        >
          {project.name}
        </h3>

        <p
          className="text-body-sm"
          style={{
            color: project.accent,
            marginBottom: "1rem",
            fontWeight: 500,
          }}
        >
          {project.headline}
        </p>

        <p
          className="text-body-sm"
          style={{
            color: "var(--color-text-secondary)",
            fontStyle: "italic",
            marginBottom: "0.65rem",
          }}
        >
          {project.problem}
        </p>

        <p
          className="text-body-sm"
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "1.5rem",
          }}
        >
          {project.built}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "1.5rem",
          }}
        >
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="text-mono-sm"
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.32rem 0.65rem",
                color: "var(--color-text-secondary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-mono-sm"
            style={{
              color: project.accent,
              textDecoration: "none",
              letterSpacing: "var(--ls-mono)",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Visit Live Site <span>↗</span>
          </a>
        ) : (
          <span
            className="text-eyebrow"
            style={{ color: "var(--color-text-muted)" }}
          >
            Coming soon · Phase 1 launching
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work">
      <div className="container">
        <SectionLabel index="03" text="WORK" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          <div>
            <h2 className="section-h2" style={{ maxWidth: "760px" }}>
              Shipped systems.{" "}
              <span style={{ color: "var(--color-accent-teal)" }}>Real production.</span>
            </h2>
            <p
              className="text-mono-sm"
              style={{
                color: "var(--color-text-muted)",
                marginTop: "0.75rem",
              }}
            >
              Five projects across medical AI, gen AI, computer vision, IoT,
              and e-commerce.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6rem",
          }}
        >
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
