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
  monogram?: string;
  aspectRatio?: string;
  imageFit?: "cover" | "contain";
}

export default function ProjectMedia({
  src,
  type = "placeholder",
  poster,
  alt,
  accent = "var(--color-accent-teal)",
  category,
  monogram,
  aspectRatio = "16 / 10",
  imageFit = "cover",
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
          style={{ objectFit: imageFit }}
        />
      )}

      {showPlaceholder && (
        <Placeholder accent={accent} category={category} monogram={monogram} />
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
  monogram,
}: {
  accent: string;
  category?: string;
  monogram?: string;
}) {
  return (
    <div className="project-media__placeholder">
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem",
        }}
      >
        {monogram && (
          <div
            aria-hidden
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "var(--radius-sm)",
              border: `1px solid ${accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "0.04em",
              color: accent,
              background: "rgba(10,11,12,0.4)",
            }}
          >
            {monogram}
          </div>
        )}
        <div
          className="text-body-sm"
          style={{ fontWeight: 500, color: "var(--color-text-secondary)" }}
        >
          {category || "Project"}
        </div>
      </div>
    </div>
  );
}
