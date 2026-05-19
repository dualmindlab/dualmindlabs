"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type MediaType = "image" | "video" | "placeholder";

interface ProjectMediaProps {
  src?: string;
  type?: MediaType;
  poster?: string;
  alt: string;
  accent?: string;
  category?: string;
  aspectRatio?: string;
}

export default function ProjectMedia({
  src,
  type = "placeholder",
  poster,
  alt,
  accent = "var(--color-accent-teal)",
  category,
  aspectRatio = "16 / 10",
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  // Pause video when offscreen
  useEffect(() => {
    if (type !== "video" || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [type]);

  const showPlaceholder = type === "placeholder" || !src || failed;

  return (
    <div
      ref={containerRef}
      className="project-media"
      style={{ aspectRatio }}
    >
      {!showPlaceholder && type === "video" && src && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          aria-label={alt}
        />
      )}

      {!showPlaceholder && type === "image" && src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          onError={() => setFailed(true)}
          style={{ objectFit: "cover" }}
        />
      )}

      {showPlaceholder && (
        <Placeholder accent={accent} category={category} />
      )}

      {/* Corner brackets for framing */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          width: "12px",
          height: "12px",
          borderTop: "1.5px solid var(--color-accent-teal)",
          borderLeft: "1.5px solid var(--color-accent-teal)",
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          width: "12px",
          height: "12px",
          borderBottom: "1.5px solid var(--color-accent-teal)",
          borderRight: "1.5px solid var(--color-accent-teal)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function Placeholder({
  accent,
  category,
}: {
  accent: string;
  category?: string;
}) {
  return (
    <div className="project-media__placeholder">
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div
          className="text-eyebrow"
          style={{ color: "var(--color-text-dim)", marginBottom: "0.5rem" }}
        >
          MEDIA PLACEHOLDER
        </div>
        <div
          className="text-body-lg"
          style={{ fontWeight: 500, color: "var(--color-text-secondary)" }}
        >
          {category || "Project Showcase"}
        </div>
        <div
          className="text-eyebrow"
          style={{
            marginTop: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: accent,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 12px ${accent}`,
            }}
          />
          image / video slot
        </div>
      </div>
    </div>
  );
}
