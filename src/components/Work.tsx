"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import ProjectMedia from "./ProjectMedia";

type StatusKind =
  | "LIVE"
  | "PRE-LAUNCH"
  | "BACKEND OFFLINE"
  | "IN TESTING"
  | "CLIENT DEMO";

const statusMeta: Record<
  StatusKind,
  { color: string; border: string; bg: string; dashed: boolean }
> = {
  LIVE: {
    color: "var(--color-accent-teal)",
    border: "rgba(6,201,168,0.4)",
    bg: "rgba(6,201,168,0.08)",
    dashed: false,
  },
  "PRE-LAUNCH": {
    color: "var(--color-accent-amber)",
    border: "rgba(232,145,42,0.45)",
    bg: "rgba(232,145,42,0.08)",
    dashed: false,
  },
  "BACKEND OFFLINE": {
    color: "var(--color-text-muted)",
    border: "var(--color-text-dim)",
    bg: "transparent",
    dashed: true,
  },
  "IN TESTING": {
    color: "var(--color-accent-purple)",
    border: "rgba(194,164,255,0.45)",
    bg: "rgba(194,164,255,0.08)",
    dashed: false,
  },
  "CLIENT DEMO": {
    color: "var(--color-text-secondary)",
    border: "var(--color-border)",
    bg: "var(--color-bg-secondary)",
    dashed: true,
  },
};

function StatusBadge({ status }: { status: StatusKind }) {
  const m = statusMeta[status];
  return (
    <span
      className="text-eyebrow"
      style={{
        padding: "0.3rem 0.6rem",
        borderRadius: "var(--radius-sm)",
        background: m.bg,
        color: m.color,
        border: `1px ${m.dashed ? "dashed" : "solid"} ${m.border}`,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: m.color,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
      {tags.map((t) => (
        <span
          key={t}
          className="text-mono-sm"
          style={{
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            padding: "0.3rem 0.6rem",
            color: "var(--color-text-secondary)",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectLink({
  url,
  label,
  accent,
}: {
  url: string;
  label: string;
  accent: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline text-mono-sm"
      style={{
        color: accent,
        textDecoration: "none",
        letterSpacing: "var(--ls-mono)",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {label} <span aria-hidden>↗</span>
    </a>
  );
}

// ─── Featured case studies ──────────────────────────────────────────────────

type Featured = {
  id: string;
  num: string;
  name: string;
  category: string;
  year: string;
  status: StatusKind;
  problem: string;
  contribution: string;
  implementation: string | string[];
  technicalDetails?: string;
  statusNote: string;
  stack: string[];
  link?: { url: string; label: string };
  media:
    | {
        kind: "image";
        src: string;
        monogram: string;
        imageFit?: "cover" | "contain";
        fullImage?: boolean;
      }
    | { kind: "detail"; monogram: string; features: string[] };
};

const featured: Featured[] = [
  {
    id: "smart-shaadi",
    num: "01",
    name: "Smart Shaadi",
    category: "Matrimonial platform · Applied AI",
    year: "2026",
    status: "PRE-LAUNCH",
    problem:
      "Matrimonial platforms match on filters, not on how two people actually communicate or whether their families align.",
    contribution:
      "I built the platform end to end — profiles, authentication, chat and payment integrations — and designed and wired its AI layer.",
    implementation: [
      "Streaming, multi-turn assistant with conversational memory and read-only tool calling.",
      "Provider-agnostic AI layer supporting Gemini and Claude.",
      "Semantic profile re-ranking with embeddings in PostgreSQL / pgvector.",
      "Conversation coaching, emotional scoring and experimental compatibility indicators.",
    ],
    technicalDetails:
      "Semantic profile re-ranking uses 768-dimensional embeddings. Six user-facing AI features are wired end to end: a conversation coach, a sentiment-based emotional score, an experimental compatibility-risk indicator, family-values compatibility, the streaming assistant and semantic re-ranking. Further backend/admin models for churn risk, response-rate reputation, marriage-readiness and profile optimisation are implemented without a public UI.",
    statusNote:
      "Pre-launch: company registration is pending and the environment currently runs on dummy data and services ahead of commercial launch. The compatibility and risk indicators are experimental, not scientifically validated.",
    stack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL / pgvector",
      "Gemini / Claude",
      "Embeddings",
      "Tool calling",
    ],
    link: { url: "https://smartshaadi.co.in/", label: "View beta" },
    media: {
      kind: "image",
      src: "/media/smart-shaadi.jpg",
      imageFit: "contain",
      fullImage: true,
      monogram: "SS",
    },
  },
  {
    id: "webscada",
    num: "02",
    name: "WebSCADA — SpaceAutoTech",
    category: "Industrial IoT · WebSCADA",
    year: "2024–2026",
    status: "BACKEND OFFLINE",
    problem:
      "Industrial sites needed real-time device telemetry and browser-based monitoring without installing dedicated SCADA software.",
    contribution:
      "I developed the final WebSCADA implementation for SpaceAutoTech — telemetry ingestion and the browser-based monitoring dashboards.",
    implementation:
      "Device telemetry arrives over MQTT and is stored as time-series in InfluxDB, then surfaced through a React dashboard on a Node.js backend with device state, live dashboards and role-based access control.",
    statusNote:
      "The client-owned frontend remains accessible, but the backend is currently unavailable — so login and live data do not work. Shown for the implementation, not as a working demo.",
    stack: ["MQTT", "Node.js", "React", "InfluxDB", "RBAC"],
    link: { url: "https://iot.spaceautotech.com", label: "View frontend" },
    media: {
      kind: "image",
      src: "/media/spaceautotech.jpg",
      monogram: "WS",
    },
  },
  {
    id: "pmstore",
    num: "03",
    name: "PMStore",
    category: "Pharmacy e-commerce",
    year: "2026",
    status: "LIVE",
    problem:
      "A pharmacy needed an online storefront where customers find medicines by composition and submit prescriptions, with full catalogue and order management behind it.",
    contribution:
      "I built and deployed the live website and its admin tooling, and developed the companion Android app.",
    implementation:
      "Medicine composition search, prescription upload, order management and catalogue import/export for bulk inventory — built on Next.js and Node.js with MongoDB / Mongoose, payment and order flows. The companion Android app uses Capacitor.",
    statusNote:
      "Live website. Capacitor Android app in Google Play testing, not yet publicly launched.",
    stack: ["Next.js", "Node.js", "MongoDB / Mongoose", "Capacitor", "Payments"],
    link: { url: "https://www.pratigyamedicalstore.com/", label: "Visit site" },
    media: {
      kind: "image",
      src: "/media/pmstore.jpg",
      monogram: "PM",
    },
  },
];

function FeatureBlock({ label, body }: { label: string; body: string | string[] }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <p
        className="text-eyebrow"
        style={{ color: "var(--color-text-dim)", marginBottom: "0.35rem" }}
      >
        {label}
      </p>
      {Array.isArray(body) ? (
        <ul
          className="text-body-sm"
          style={{
            color: "var(--color-text-secondary)",
            listStyleType: "disc",
            paddingLeft: "1.2rem",
            display: "grid",
            gap: "0.4rem",
          }}
        >
          {body.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : (
        <p className="text-body-sm" style={{ color: "var(--color-text-secondary)" }}>{body}</p>
      )}
    </div>
  );
}

function FeatureRow({ project, index }: { project: Featured; index: number }) {
  const reverse = index % 2 === 1;
  const accent = statusMeta[project.status].color;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`feature-strip${reverse ? " reverse" : ""}`}
    >
      {/* Media / detail */}
      <div style={{ position: "relative" }}>
        {project.media.kind === "image" ? (
          <>
            <ProjectMedia
              imageFit={project.media.imageFit}
              type="image"
              src={project.media.src}
              monogram={project.media.monogram}
              alt={`${project.name} — ${project.category}`}
              accent={accent}
              category={project.category}
            />
            {project.media.fullImage && (
              <a
                href={project.media.src}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-mono-sm"
                style={{ display: "inline-block", marginTop: "0.75rem", color: "var(--color-accent-teal)" }}
              >
                Open full screenshot <span aria-hidden>↗</span>
              </a>
            )}
          </>
        ) : (
          <div className="project-detail-panel">
            <div
              aria-hidden
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                color: accent,
                marginBottom: "1.25rem",
              }}
            >
              {project.media.monogram}
            </div>
            <p
              className="text-eyebrow"
              style={{ color: "var(--color-text-dim)", marginBottom: "1rem" }}
            >
              Key features
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.7rem",
              }}
            >
              {project.media.features.map((f) => (
                <li
                  key={f}
                  className="text-body-sm"
                  style={{
                    color: "var(--color-text-primary)",
                    display: "flex",
                    gap: "0.6rem",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ color: accent, flexShrink: 0 }}>→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.85rem",
            flexWrap: "wrap",
          }}
        >
          <span className="text-h2" style={{ color: accent }}>
            {project.num}
          </span>
          <StatusBadge status={project.status} />
          <span
            className="text-mono-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {project.category} · {project.year}
          </span>
        </div>

        <h3 className="text-h3" style={{ marginBottom: "1.25rem" }}>
          {project.name}
        </h3>

        <FeatureBlock label="Problem" body={project.problem} />
        <FeatureBlock label="My contribution" body={project.contribution} />
        <FeatureBlock label="Implementation" body={project.implementation} />
        {project.technicalDetails && (
          <details style={{ marginBottom: "1rem", color: "var(--color-text-secondary)" }}>
            <summary className="text-body-sm" style={{ cursor: "pointer", color: "var(--color-accent-teal)" }}>Technical details</summary>
            <p className="text-body-sm" style={{ marginTop: "0.75rem" }}>{project.technicalDetails}</p>
          </details>
        )}
        <FeatureBlock label="Current status" body={project.statusNote} />

        <div style={{ margin: "1.25rem 0" }}>
          <TagRow tags={project.stack} />
        </div>

        {project.link && (
          <ProjectLink
            url={project.link.url}
            label={project.link.label}
            accent="var(--color-accent-teal)"
          />
        )}
      </div>
    </motion.article>
  );
}

// ─── Supporting projects ────────────────────────────────────────────────────

type Supporting = {
  id: string;
  name: string;
  category: string;
  status: StatusKind;
  monogram: string;
  blurb: string;
  stack: string[];
  image?: string;
  link: { url: string; label: string };
};

const supporting: Supporting[] = [
  {
    id: "taptifs",
    name: "TaptiFS",
    category: "Food e-commerce",
    status: "LIVE",
    monogram: "TF",
    blurb:
      "Live food & spices storefront built during the SpaceAutoTech engagement — authentication, Paytm payments, order tracking and a full admin dashboard.",
    stack: ["Next.js", "Node.js", "Paytm"],
    image: "/media/taptifs.jpg",
    link: { url: "https://taptifs.com", label: "Visit site" },
  },
  {
    id: "colonels-pickle",
    name: "Colonel's Pickle",
    category: "E-commerce",
    status: "LIVE",
    monogram: "CP",
    blurb:
      "Live e-commerce site with ordering, authentication and an administration dashboard.",
    stack: ["Next.js", "Node.js", "Auth"],
    image: "/media/colonels-pickle.jpg",
    link: {
      url: "https://www.colonelspicklebyridhwika.com/",
      label: "Visit site",
    },
  },
  {
    id: "pulselogic",
    name: "Pulse Logic",
    category: "Client demo · Web / Android / Desktop",
    status: "CLIENT DEMO",
    monogram: "PL",
    blurb:
      "A client demonstration across web, Android and desktop: an API-based chatbot focused on medical questions. Built as a demo — not a clinical or diagnostic tool.",
    stack: ["Next.js", "LLM APIs", "Tauri"],
    image: "/media/pulselogic.jpg",
    link: { url: "https://pulse-six-kappa.vercel.app", label: "View demo" },
  },
  {
    id: "marksman",
    name: "Marksman",
    category: "Client demo · Web / Android",
    status: "CLIENT DEMO",
    monogram: "MK",
    blurb:
      "A client demonstration for web and Android: a shooting-focused AI coach with OpenCV target-hole detection and scoring.",
    stack: ["React", "OpenCV", "React Native"],
    image: "/media/marksmanspro.jpg",
    link: { url: "https://marksmanspro.com", label: "View demo" },
  },
  {
    id: "gulaabi-clean",
    name: "Gulaabi Clean",
    category: "Home-service booking",
    status: "IN TESTING",
    monogram: "GC",
    blurb:
      "A home-service booking product with separate customer and worker applications. Both apps are in testing ahead of public launch.",
    stack: ["React Native", "Node.js"],
    image: "/media/gulaabi-clean.jpg",
    link: { url: "https://www.gulaabiclean.com/", label: "Visit site" },
  },
  {
    id: "deployment-corner",
    name: "Deployment Corner",
    category: "Hiring platform",
    status: "LIVE",
    monogram: "DC",
    blurb:
      "A hiring platform with job listings, an applicant flow, a résumé builder and administration. Built during the SpaceAutoTech engagement.",
    stack: ["Next.js", "Node.js"],
    image: "/media/deployment-corner.jpg",
    link: { url: "https://www.demploymentcorner.com/", label: "Visit site" },
  },
];

function SupportingCard({ project }: { project: Supporting }) {
  const accent = statusMeta[project.status].color;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="support-card"
    >
      <ProjectMedia
        type={project.image ? "image" : "placeholder"}
        src={project.image}
        monogram={project.monogram}
        alt={`${project.name} — ${project.category}`}
        accent={accent}
        category={project.category}
      />
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "0.6rem",
          }}
        >
          <h4 className="text-h4">{project.name}</h4>
          <StatusBadge status={project.status} />
        </div>
        <p
          className="text-mono-sm"
          style={{ color: "var(--color-text-muted)", marginBottom: "0.85rem" }}
        >
          {project.category}
        </p>
        <p
          className="text-body-sm"
          style={{ color: "var(--color-text-secondary)", marginBottom: "1.1rem", flex: 1 }}
        >
          {project.blurb}
        </p>
        <div style={{ marginBottom: "1.1rem" }}>
          <TagRow tags={project.stack} />
        </div>
        <ProjectLink
          url={project.link.url}
          label={project.link.label}
          accent="var(--color-accent-teal)"
        />
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work">
      <div className="container">
        <SectionLabel index="02" text="WORK" />
        <div style={{ marginBottom: "4rem", maxWidth: "760px" }}>
          <h2 className="section-h2">
            Featured{" "}
            <span style={{ color: "var(--color-accent-teal)" }}>case studies</span>.
          </h2>
          <p
            className="text-mono-sm"
            style={{ color: "var(--color-text-muted)", marginTop: "0.75rem" }}
          >
            Problem → contribution → implementation → current status. Each status
            reflects what&apos;s actually live, in testing, pre-launch or a demo.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5.5rem" }}>
          {featured.map((p, i) => (
            <FeatureRow key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Supporting projects */}
        <div style={{ marginTop: "6rem" }}>
          <h3
            className="text-h3"
            style={{ marginBottom: "0.5rem" }}
          >
            More projects
          </h3>
          <p
            className="text-mono-sm"
            style={{ color: "var(--color-text-muted)", marginBottom: "2.5rem" }}
          >
            Additional client products and demonstrations.
          </p>
          <div className="support-grid">
            {supporting.map((p) => (
              <SupportingCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
