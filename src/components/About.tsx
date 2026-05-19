"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

const chips = ["AI + Industrial", "4+ Years Shipping", "Solo Practice"] as const;

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div style={{ maxWidth: "900px", marginBottom: "4rem" }}>
          <SectionLabel index="02" text="ABOUT" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="section-h2"
          >
            One engineer. Real work.
          </motion.h2>
        </div>

        <div className="grid-2 grid-2--aside">
          {/* Photo frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
          >
            <p
              className="text-eyebrow"
              style={{
                position: "absolute",
                top: "-1.5rem",
                left: 0,
                color: "var(--color-text-muted)",
              }}
            >
              PROFILE_01 ╌╌╌╌
            </p>

            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                background: "var(--color-bg-secondary)",
                borderLeft: "2px solid var(--color-accent-teal)",
                borderBottom: "2px solid var(--color-accent-teal)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                overflow: "hidden",
              }}
            >
              <Image
                src="/media/ashwin.jpg"
                alt="Ashwin Hingve"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                  opacity: 0.18,
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "70%",
                  height: "70%",
                  background:
                    "linear-gradient(225deg, rgba(6,201,168,0.12), transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.18) 38%, transparent 62%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "1.25rem",
                  right: "1.25rem",
                  bottom: "1.25rem",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "44px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, var(--color-accent-teal), transparent)",
                  }}
                />
                <span
                  className="text-eyebrow"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Ashwin Hingve
                </span>
                <span
                  className="text-eyebrow"
                  style={{ color: "var(--color-text-dim)" }}
                >
                  AI Systems Engineer · IND
                </span>
              </div>

              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(6,201,168,0.5), transparent)",
                  animation: "scan-line 4s linear infinite",
                  pointerEvents: "none",
                }}
              />
            </div>

            <p
              className="text-eyebrow"
              style={{
                marginTop: "0.75rem",
                color: "var(--color-text-muted)",
                textAlign: "right",
              }}
            >
              ╌╌╌╌ ASHWIN HINGVE · IND
            </p>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <p
              className="text-body-lg"
              style={{
                color: "var(--color-text-primary)",
                marginBottom: "1.25rem",
                fontWeight: 500,
              }}
            >
              I build AI systems that hold up in production.
            </p>
            <p
              className="text-body"
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "1.25rem",
                maxWidth: "580px",
              }}
            >
              Generative AI apps, autonomous agents, and full-stack web
              platforms — delivered solo, end to end. Currently live:{" "}
              <span style={{ color: "var(--color-accent-teal)" }}>
                a medical AI chatbot
              </span>{" "}
              handling clinical intake and triage for an army medical
              operation.
            </p>
            <p
              className="text-body-sm"
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "2.5rem",
                maxWidth: "580px",
              }}
            >
              I started without formal training, driven by a need to build
              things that actually worked in the real world. Based in Madhya
              Pradesh, India. Remote-first. I also ship industrial IoT and
              computer-vision systems when the problem is right.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              {chips.map((c) => (
                <span
                  key={c}
                  className="text-mono-sm"
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-pill)",
                    color: "var(--color-text-primary)",
                    background: "var(--color-bg-secondary)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
