"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

type Service = {
  num: string;
  name: string;
  tagline: string;
  skills: string[];
  accent: string;
};

const services: Service[] = [
  {
    num: "01",
    name: "Generative AI Applications",
    tagline:
      "LLM-powered products with retrieval, tool use, and streaming UX. From prompt engineering through eval to production deployment with monitoring.",
    accent: "var(--color-accent-purple)",
    skills: [
      "RAG pipelines with vector search",
      "Streaming chat with Vercel AI SDK",
      "Provider-agnostic via AI Gateway",
      "Eval, observability, and cost control",
    ],
  },
  {
    num: "02",
    name: "Autonomous Agents",
    tagline:
      "Multi-step agents that reason, plan, and call tools. Built for reliability — graceful failure, retries, and human-in-the-loop checkpoints.",
    accent: "var(--color-accent-teal)",
    skills: [
      "Tool-calling with structured output",
      "Long-running workflows & queues",
      "Memory, sessions, and state",
      "Guardrails and safety review",
    ],
  },
  {
    num: "03",
    name: "Computer Vision & Inference",
    tagline:
      "Detection, classification, and measurement pipelines for browser or server. ONNX-optimised models on the edge or in the cloud.",
    accent: "var(--color-accent-amber)",
    skills: [
      "YOLOv8 fine-tuning & deployment",
      "ONNX Runtime Web / server inference",
      "OpenCV pre/post-processing",
      "Real-time scoring & analytics",
    ],
  },
  {
    num: "04",
    name: "AI for Industrial Operations",
    tagline:
      "Where AI meets the physical world: ops dashboards, control-room tooling, and SCADA-adjacent platforms with sensor data, alerts, and live monitoring.",
    accent: "var(--color-accent-teal)",
    skills: [
      "MQTT / Sparkplug B telemetry",
      "Time-series storage (InfluxDB)",
      "WebSCADA dashboards with RBAC",
      "ESP32 / LoRaWAN field firmware",
    ],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className="service-card corner-brackets"
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <span
          className="text-eyebrow"
          style={{ color: service.accent }}
        >
          {service.num} / Domain
        </span>
      </div>

      <h3
        className="text-h3"
        style={{ marginBottom: "0.75rem" }}
      >
        {service.name}
      </h3>

      <p
        className="text-body-sm"
        style={{
          color: "var(--color-text-secondary)",
          marginBottom: "1.5rem",
        }}
      >
        {service.tagline}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
        }}
      >
        {service.skills.map((skill) => (
          <li
            key={skill}
            className="text-mono-sm"
            style={{
              color: "var(--color-text-secondary)",
              display: "flex",
              gap: "0.6rem",
              alignItems: "baseline",
            }}
          >
            <span style={{ color: service.accent, flexShrink: 0 }}>→</span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <SectionLabel index="04" text="WHAT I DO" />
        <div style={{ marginBottom: "3rem" }}>
          <h2 className="section-h2">What I build for clients.</h2>
        </div>

        <div className="services-row">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
