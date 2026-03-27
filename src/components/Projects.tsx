"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type MediaType = "image" | "video";

interface Project {
  title: string;
  category: string;
  year: string;
  client: string;
  live: boolean;
  metric: string;
  metricLabel: string;
  metricColor: string;
  metricBg: string;
  problem: string;
  solution: string;
  results: string;
  tags: string[];
  accent: string;
  accentRgb: string;
  mediaType: MediaType;
  /** Set to real path once assets are ready, e.g. "/media/ai-dashboard.jpg" */
  image: string | null;
  /** Set to real path once assets are ready, e.g. "/media/ai-dashboard.mp4" */
  video: string | null;
  featured: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Web", "Mobile", "AI", "Desktop"];

const projects: Project[] = [
  {
    title: "AI Analytics Dashboard",
    category: "Web",
    year: "2025",
    client: "B2B SaaS",
    live: true,
    metric: "+40%",
    metricLabel: "qualified pipeline",
    metricColor: "text-violet-400",
    metricBg: "bg-violet-500/10 border-violet-500/20",
    problem:
      "No visibility into which cohorts were converting or churning — critical decisions made on gut feel.",
    solution:
      "Real-time dashboard with an AI inference layer that auto-surfaces anomalies and cohort patterns. Next.js frontend, Python ML backend, streaming WebSocket updates.",
    results:
      "+40% qualified pipeline · 3× faster executive reporting cycle",
    tags: ["Next.js", "Python", "AI/ML", "WebSockets"],
    accent: "rgba(139,92,246,0.18)",
    accentRgb: "139,92,246",
    mediaType: "video",
    image: null,   // → replace with: "/media/ai-dashboard-poster.jpg"
    video: null,   // → replace with: "/media/ai-dashboard.mp4"
    featured: true,
  },
  {
    title: "E-Commerce Mobile App",
    category: "Mobile",
    year: "2025",
    client: "Retail Brand",
    live: true,
    metric: "−50%",
    metricLabel: "cart abandonment",
    metricColor: "text-blue-400",
    metricBg: "bg-blue-500/10 border-blue-500/20",
    problem:
      "68% cart abandonment rate and app couldn't survive flash-sale traffic spikes.",
    solution:
      "Rebuilt in React Native with a smart recommendation engine, optimistic UI updates, and Stripe + Razorpay payments.",
    results:
      "Cart abandonment: 68% → 34% · Zero downtime across 3 peak-traffic events",
    tags: ["React Native", "Stripe", "Serverless"],
    accent: "rgba(59,130,246,0.15)",
    accentRgb: "59,130,246",
    mediaType: "image",
    image: null,   // → replace with: "/media/ecommerce-app.jpg"
    video: null,
    featured: false,
  },
  {
    title: "Healthcare Management System",
    category: "Web",
    year: "2024",
    client: "Medical Practice",
    live: true,
    metric: "12 hrs",
    metricLabel: "reclaimed / week",
    metricColor: "text-emerald-400",
    metricBg: "bg-emerald-500/10 border-emerald-500/20",
    problem:
      "Appointments managed via spreadsheets — missed slots and billing errors costing revenue daily.",
    solution:
      "Full-stack platform: conflict-aware booking, HIPAA-friendly records, and automated billing with PDF generation.",
    results:
      "No-shows down 30% · Billing errors −15% · Staff reclaimed 12 hrs/week",
    tags: ["Full-Stack", "HIPAA", "Automation"],
    accent: "rgba(16,185,129,0.12)",
    accentRgb: "16,185,129",
    mediaType: "image",
    image: null,   // → replace with: "/media/healthcare.jpg"
    video: null,
    featured: false,
  },
  {
    title: "AI Chatbot Platform",
    category: "AI",
    year: "2025",
    client: "SaaS Company",
    live: true,
    metric: "−70%",
    metricLabel: "Tier-1 ticket volume",
    metricColor: "text-orange-400",
    metricBg: "bg-orange-500/10 border-orange-500/20",
    problem:
      "Support team spending 80% of time on repetitive queries — 48-hour average response times.",
    solution:
      "LLM-powered agent with RAG over their knowledge base, CRM integration via Zapier, smart escalation routing.",
    results:
      "Response time: 48 hr → 2 min · Tier-1 volume −70% · Cost per ticket −60%",
    tags: ["LLM", "RAG", "CRM", "Zapier"],
    accent: "rgba(249,115,22,0.12)",
    accentRgb: "249,115,22",
    mediaType: "video",
    image: null,   // → replace with: "/media/chatbot-poster.jpg"
    video: null,   // → replace with: "/media/chatbot-demo.mp4"
    featured: false,
  },
  {
    title: "Restaurant Ordering App",
    category: "Mobile",
    year: "2024",
    client: "Restaurant Chain",
    live: true,
    metric: "3.3×",
    metricLabel: "faster order cycle",
    metricColor: "text-rose-400",
    metricBg: "bg-rose-500/10 border-rose-500/20",
    problem:
      "Paper-based ordering causing 20-minute wait times and frequent errors at peak hours.",
    solution:
      "React Native app with real-time kitchen sync via WebSockets, QR-based table ordering, Stripe Terminal.",
    results:
      "Order time: 20 min → 6 min · Order errors −90% · Online revenue +35% in Q1",
    tags: ["React Native", "WebSockets", "Stripe"],
    accent: "rgba(244,63,94,0.12)",
    accentRgb: "244,63,94",
    mediaType: "image",
    image: null,   // → replace with: "/media/restaurant-app.jpg"
    video: null,
    featured: false,
  },
  {
    title: "Desktop Inventory Manager",
    category: "Desktop",
    year: "2024",
    client: "Warehouse Operator",
    live: false,
    metric: "4×",
    metricLabel: "faster reconciliation",
    metricColor: "text-amber-400",
    metricBg: "bg-amber-500/10 border-amber-500/20",
    problem:
      "Reconciling inventory across 3 locations manually took 2 full days per month.",
    solution:
      "Electron app with barcode scanner integration, SQLite local DB, automated low-stock alerts, multi-location sync.",
    results:
      "Reconciliation: 2 days → 3 hours · Stockout incidents −80%",
    tags: ["Electron", "SQLite", "Automation"],
    accent: "rgba(234,179,8,0.10)",
    accentRgb: "234,179,8",
    mediaType: "image",
    image: null,   // → replace with: "/media/inventory-manager.jpg"
    video: null,
    featured: false,
  },
];

// ─── Placeholder visuals (swap with real <img> / <video> later) ───────────────

/** Category → mock UI chrome drawn in pure CSS/SVG */
const PLACEHOLDER_CONFIGS: Record<string, { bars: string[]; lines: number; icon: string }> = {
  Web:     { bars: ["40%","65%","50%","80%","55%","70%"], lines: 5, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  Mobile:  { bars: ["55%","40%","70%","45%","60%","35%"], lines: 4, icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  AI:      { bars: ["30%","60%","45%","75%","50%","85%"], lines: 6, icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  Desktop: { bars: ["90%","75%","85%","60%","95%","70%"], lines: 5, icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
};

function MediaPlaceholder({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const cfg = PLACEHOLDER_CONFIGS[project.category] ?? PLACEHOLDER_CONFIGS.Web;

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{
        background: `radial-gradient(ellipse at 30% 40%, rgba(${project.accentRgb},0.22) 0%, #0a0a10 70%)`,
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-bg opacity-25" />

      {/* Mock window chrome */}
      <div className="absolute top-0 left-0 right-0 h-9 flex items-center gap-1.5 px-4 border-b border-white/[0.05] bg-white/[0.015]">
        {["bg-red-500/50","bg-yellow-500/50","bg-green-500/50"].map((c,i) => (
          <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
        ))}
        <div className="flex-1 mx-4 h-4 rounded bg-white/[0.04] max-w-[160px]" />
        {/* Address bar dots */}
        <div className="w-3 h-3 rounded bg-white/[0.04]" />
      </div>

      {/* Mock sidebar */}
      <div className="absolute top-9 left-0 bottom-0 w-[52px] border-r border-white/[0.04] bg-white/[0.01] hidden sm:flex flex-col items-center py-4 gap-3">
        {[...Array(5)].map((_,i) => (
          <div key={i} className="w-7 h-7 rounded-lg bg-white/[0.04]" />
        ))}
      </div>

      {/* Main content area */}
      <div className="absolute top-9 left-[52px] right-0 bottom-0 p-4 sm:p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center gap-3">
          <div className="h-5 rounded bg-white/[0.06]" style={{ width: `${large ? 140 : 100}px` }} />
          <div className="flex-1" />
          <div className="h-5 w-16 rounded-full bg-white/[0.04]" />
        </div>

        {/* Metric row */}
        <div className="flex gap-2">
          {["72px","88px","64px"].map((w,i) => (
            <div
              key={i}
              className="h-12 rounded-xl flex-shrink-0"
              style={{ width: w, background: `rgba(${project.accentRgb},${i === 1 ? 0.2 : 0.08})`, border: `1px solid rgba(${project.accentRgb},0.15)` }}
            />
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 flex flex-col gap-2 min-h-0 overflow-hidden">
          {/* Chart bars */}
          <div className="flex items-end gap-1.5 flex-1">
            {cfg.bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: h, background: `rgba(${project.accentRgb},${i % 2 === 0 ? 0.55 : 0.3})` }} />
            ))}
          </div>
          {/* X-axis */}
          <div className="flex gap-1.5">
            {cfg.bars.map((_,i) => (
              <div key={i} className="flex-1 h-1.5 rounded-sm bg-white/[0.04]" />
            ))}
          </div>
        </div>

        {/* Table rows */}
        {[...Array(cfg.lines)].map((_,i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: `rgba(${project.accentRgb},0.6)` }} />
            <div className="h-2.5 rounded-sm bg-white/[0.05]" style={{ width: `${55 + (i * 13) % 35}%` }} />
            <div className="flex-1" />
            <div className="h-2.5 w-10 rounded-sm bg-white/[0.04]" />
          </div>
        ))}
      </div>

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)" }} />

      {/* Category icon watermark */}
      <div className="absolute bottom-4 right-4 opacity-[0.07]">
        <svg width={large ? 48 : 36} height={large ? 48 : 36} fill="none" stroke="white" strokeWidth="1" viewBox="0 0 24 24">
          <path d={cfg.icon} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/** Renders either real <img>, real <video> with hover-play, or the CSS placeholder */
function ProjectMedia({
  project,
  large = false,
  autoplayVideo = false,
}: {
  project: Project;
  large?: boolean;
  autoplayVideo?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setVideoPlaying(true);
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setVideoPlaying(false);
    }
  };

  return (
    <div
      className="relative w-full h-full group/media"
      onMouseEnter={project.mediaType === "video" && project.video ? handleMouseEnter : undefined}
      onMouseLeave={project.mediaType === "video" && project.video ? handleMouseLeave : undefined}
    >
      {/* ── Real image ── */}
      {project.image && project.mediaType === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover"
        />
      )}

      {/* ── Real video ── */}
      {project.video && project.mediaType === "video" && (
        <>
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.title} poster`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? "opacity-0" : "opacity-100"}`}
            />
          )}
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? "opacity-100" : "opacity-0"}`}
          />
        </>
      )}

      {/* ── CSS placeholder (shown when image is null) ── */}
      {!project.image && (
        <MediaPlaceholder project={project} large={large} />
      )}

      {/* ── Video play overlay (when no real video yet) ── */}
      {project.mediaType === "video" && !project.video && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm"
            style={{ background: `rgba(${project.accentRgb},0.25)` }}
          >
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* ── Hover shimmer on real assets ── */}
      {(project.image || project.video) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity duration-400" />
      )}
    </div>
  );
}

// ─── PSR (Problem–Solution–Result) accordion ─────────────────────────────────

function PSRAccordion({ project, isOpen }: { project: Project; isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-5 space-y-4">
            {[
              {
                label: "Solution",
                text: project.solution,
                dotColor: `rgba(${project.accentRgb},0.9)`,
                barColor: `rgba(${project.accentRgb},0.2)`,
              },
              {
                label: "Results",
                text: project.results,
                dotColor: "rgba(52,211,153,0.9)",
                barColor: "rgba(52,211,153,0.18)",
              },
            ].map(({ label, text, dotColor, barColor }) => (
              <div key={label} className="flex gap-3">
                <div className="mt-[5px] flex flex-col items-center gap-1 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />
                  <span className="w-px flex-1 min-h-[28px]" style={{ background: barColor }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/55 uppercase tracking-[0.18em] mb-1.5">{label}</p>
                  <p className="text-[13px] font-body text-white/72 leading-[1.78]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Featured card (full-width, media + content side-by-side) ────────────────

function FeaturedCard({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
      className="group relative rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0b0b0f] hover:border-white/[0.14] transition-colors duration-400"
    >
      {/* Top edge shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${project.accentRgb},0.6), transparent)` }}
      />

      <div className="flex flex-col lg:flex-row">
        {/* ── Left: Media panel ── */}
        <div className="relative lg:w-[56%] aspect-video lg:aspect-auto lg:min-h-[440px] overflow-hidden flex-shrink-0">
          <ProjectMedia project={project} large autoplayVideo />

          {/* Live badge floated over media */}
          {project.live && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.12] bg-black/50 backdrop-blur-sm">
              <span
                className="w-[6px] h-[6px] rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)", animation: "pulse-soft 2s infinite" }}
              />
              <span className="text-[10px] font-mono text-emerald-400/90 tracking-wider">LIVE</span>
            </div>
          )}

          {/* Video indicator */}
          {project.mediaType === "video" && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.1] bg-black/50 backdrop-blur-sm">
              <svg className="w-3 h-3 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 10l4.553-2.069A1 1 0 0121 8.873v6.254a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <span className="text-[10px] font-mono text-white/55 tracking-wide">VIDEO</span>
            </div>
          )}

          {/* Bottom gradient fade into content */}
          <div className="absolute bottom-0 left-0 right-0 h-16 lg:hidden pointer-events-none" style={{ background: "linear-gradient(to top, #0b0b0f, transparent)" }} />
          <div className="absolute top-0 right-0 bottom-0 w-16 hidden lg:block pointer-events-none" style={{ background: "linear-gradient(to right, transparent, #0b0b0f)" }} />
        </div>

        {/* ── Right: Content panel ── */}
        <div className="flex-1 p-7 md:p-9 flex flex-col min-w-0">
          {/* Top row */}
          <div className="flex items-center gap-2.5 mb-6">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border"
              style={{
                color: `rgba(${project.accentRgb},0.85)`,
                borderColor: `rgba(${project.accentRgb},0.3)`,
                background: `rgba(${project.accentRgb},0.08)`,
              }}
            >
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-white/30">{project.client}</span>
            <div className="flex-1" />
            <span className="text-[11px] font-mono text-white/28">{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="text-[22px] md:text-[26px] font-display font-bold text-white/90 tracking-[-0.03em] leading-[1.15] mb-5 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Hero metric */}
          <div className={`inline-flex items-baseline gap-2.5 rounded-xl border px-5 py-3.5 mb-5 self-start ${project.metricBg}`}>
            <span className={`text-[3.2rem] font-display font-black tracking-[-0.045em] leading-none ${project.metricColor}`}>
              {project.metric}
            </span>
            <span className="text-[12px] font-mono text-white/75">{project.metricLabel}</span>
          </div>

          {/* Problem */}
          <p className="text-[15px] font-body text-white/78 leading-[1.78] mb-5 flex-shrink-0">
            {project.problem}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono text-white/65 border border-white/[0.06] rounded-md bg-white/[0.02]"
              >
                <svg width="6" height="6" viewBox="0 0 8 8" fill={`rgba(${project.accentRgb},0.7)`} className="flex-shrink-0">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {tag}
              </span>
            ))}
          </div>

          {/* PSR toggle + content */}
          <div className="mt-auto pt-5 border-t border-white/[0.05]">
            <motion.button
              onClick={onToggle}
              whileHover={{ x: 3 }}
              className="flex items-center gap-2 text-[12px] font-mono text-white/65 hover:text-white/80 transition-colors"
            >
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.22 }}
                className="w-[18px] h-[18px] rounded-full border border-white/[0.15] flex items-center justify-center text-[8px] leading-none"
              >
                ▶
              </motion.span>
              {isOpen ? "Collapse case study" : "View full case study"}
            </motion.button>

            <PSRAccordion project={project} isOpen={isOpen} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Regular card (thumbnail top, content below) ─────────────────────────────

function ProjectCard({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.52, delay: index * 0.07, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl border border-white/[0.07] bg-[#0b0b0f] overflow-hidden flex flex-col transition-colors duration-300 hover:border-white/[0.13]"
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${project.accentRgb},0.12) 0%, transparent 65%)` }}
      />

      {/* ── Thumbnail media ── */}
      <div className="relative aspect-video overflow-hidden border-b border-white/[0.05]">
        <ProjectMedia project={project} />

        {/* Live pill */}
        {project.live && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/[0.1] bg-black/50 backdrop-blur-sm">
            <span
              className="w-[5px] h-[5px] rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 6px rgba(52,211,153,0.7)", animation: "pulse-soft 2s infinite" }}
            />
            <span className="text-[9px] font-mono text-emerald-400/85 tracking-wider">LIVE</span>
          </div>
        )}

        {/* Video badge */}
        {project.mediaType === "video" && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.1]">
            <span className="text-[9px] font-mono text-white/50 tracking-wide">▶ VIDEO</span>
          </div>
        )}

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none" style={{ background: "linear-gradient(to top, #0b0b0f, transparent)" }} />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-6 relative z-10">
        {/* Header row */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
            style={{
              color: `rgba(${project.accentRgb},0.8)`,
              borderColor: `rgba(${project.accentRgb},0.25)`,
              background: `rgba(${project.accentRgb},0.07)`,
            }}
          >
            {project.category}
          </span>
          <span className="text-[9px] font-mono text-white/28">{project.client}</span>
          <div className="flex-1" />
          <span className="text-[10px] font-mono text-white/25">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-display font-bold text-white/88 tracking-[-0.025em] leading-[1.25] mb-3.5 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Metric badge */}
        <div className={`inline-flex items-baseline gap-2 rounded-lg border px-3.5 py-2.5 mb-4 self-start ${project.metricBg}`}>
          <span className={`text-[2rem] font-display font-black tracking-[-0.04em] leading-none ${project.metricColor}`}>
            {project.metric}
          </span>
          <span className="text-[10px] font-mono text-white/72">{project.metricLabel}</span>
        </div>

        {/* Problem */}
        <p className="text-[13px] font-body text-white/75 leading-[1.75] mb-4 line-clamp-3">
          {project.problem}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-[3px] text-[10px] font-mono text-white/60 border border-white/[0.05] rounded-md bg-white/[0.015]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Toggle */}
        <div className="mt-auto pt-4 border-t border-white/[0.05]">
          <motion.button
            onClick={onToggle}
            whileHover={{ x: 2 }}
            className="flex items-center gap-2 text-[11px] font-mono text-white/60 hover:text-white/78 transition-colors"
          >
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.22 }}
              className="w-[16px] h-[16px] rounded-full border border-white/[0.14] flex items-center justify-center text-[7px] leading-none"
            >
              ▶
            </motion.span>
            {isOpen ? "Collapse" : "Full case study"}
          </motion.button>

          <PSRAccordion project={project} isOpen={isOpen} />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openCard, setOpenCard] = useState<string | null>(null);

  const filtered = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );
  const featured = filtered[0];
  const rest = filtered.slice(1);

  const toggle = (title: string) =>
    setOpenCard(openCard === title ? null : title);

  return (
    <section
      id="projects"
      className="relative py-28 md:py-36 px-6 border-b border-white/[0.04] overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full opacity-[0.022] blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full opacity-[0.018] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-10"
        >
          <p className="section-label mb-4">Case Studies</p>
          <h2 className="section-heading text-[clamp(2.2rem,5vw,3.6rem)] gradient-text leading-[1.05]">
            Problems we&apos;ve solved
          </h2>
          <p className="mt-4 text-[16px] font-body text-white/70 max-w-[460px] mx-auto leading-[1.8]">
            Real client problems, real outcomes — every number is verified.
          </p>

          {/* Impact bar — centred below heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-stretch gap-px mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
          >
            {[
              { value: "6",     label: "Projects" },
              { value: "$2M+",  label: "Value delivered" },
              { value: "100%",  label: "On-time" },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={`px-6 py-4 text-center ${i < 2 ? "border-r border-white/[0.06]" : ""}`}
              >
                <div className="text-[20px] font-display font-bold text-white/90 tracking-[-0.03em]">{value}</div>
                <div className="text-[10px] font-mono text-white/55 mt-0.5 whitespace-nowrap">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Category filters — centred ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-12 justify-center"
        >
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenCard(null); }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-4 py-2 text-[12px] font-mono rounded-xl border transition-colors duration-200 flex items-center gap-2 overflow-hidden ${
                  isActive
                    ? "border-violet-500/50 text-white"
                    : "border-white/[0.07] bg-white/[0.02] text-white/72 hover:border-white/[0.12]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-violet-500/12"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-violet-500/20 text-violet-300"
                      : "bg-white/[0.04] text-white/30"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Featured card ── */}
        {featured && (
          <div className="mb-5">
            <FeaturedCard
              project={featured}
              isOpen={openCard === featured.title}
              onToggle={() => toggle(featured.title)}
            />
          </div>
        )}

        {/* ── Grid cards ── */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i + 1}
                isOpen={openCard === project.title}
                onToggle={() => toggle(project.title)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
