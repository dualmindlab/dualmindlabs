"use client";

import { useEffect, useRef, useState } from "react";

const prompt =
  "patient reports chest pain, 42yo male, no prior history. triage?";

const responseLines = [
  { t: 400, text: "→ Parsing intake...", kind: "step" as const },
  {
    t: 900,
    text: "→ Retrieving ACC/AHA guidelines (8 docs)",
    kind: "step" as const,
  },
  {
    t: 1600,
    text: "→ Running diagnostic heuristic chain",
    kind: "step" as const,
  },
  {
    t: 2400,
    text: "→ Risk stratification: moderate-high",
    kind: "step" as const,
  },
  {
    t: 3100,
    text: "✓ Escalate: cardiology + 12-lead ECG within 10min",
    kind: "result" as const,
  },
];

export default function AITerminal() {
  const [typed, setTyped] = useState("");
  const [shown, setShown] = useState<number>(0);
  const [cycle, setCycle] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear prior timers on re-cycle
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setTyped("");
    setShown(0);

    // Type prompt
    let i = 0;
    const typeTimer = setInterval(() => {
      i++;
      setTyped(prompt.slice(0, i));
      if (i >= prompt.length) clearInterval(typeTimer);
    }, 30);

    // Reveal response lines
    responseLines.forEach((_, idx) => {
      const t = setTimeout(
        () => setShown((s) => Math.max(s, idx + 1)),
        prompt.length * 30 + responseLines[idx].t
      );
      timersRef.current.push(t);
    });

    // Restart cycle after finish
    const restart = setTimeout(
      () => setCycle((c) => c + 1),
      prompt.length * 30 + responseLines[responseLines.length - 1].t + 4500
    );
    timersRef.current.push(restart);

    return () => {
      clearInterval(typeTimer);
      timersRef.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  return (
    <div
      className="text-mono-sm"
      style={{
        lineHeight: 1.7,
        color: "var(--color-text-secondary)",
        minHeight: "240px",
        position: "relative",
      }}
    >
      {/* Prompt line */}
      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.85rem" }}>
        <span style={{ color: "var(--color-accent-teal)", flexShrink: 0 }}>you</span>
        <span style={{ color: "var(--color-text-dim)" }}>▸</span>
        <span style={{ color: "var(--color-text-primary)", wordBreak: "break-word" }}>
          {typed}
          <span
            className="cursor-blink"
            style={{
              display: typed.length < prompt.length ? "inline-block" : "none",
              width: "0.5em",
              height: "1em",
              background: "var(--color-accent-teal)",
              verticalAlign: "text-bottom",
              marginLeft: "1px",
            }}
          />
        </span>
      </div>

      {/* Response */}
      {typed.length >= prompt.length && (
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
          <span style={{ color: "var(--color-accent-teal)", flexShrink: 0 }}>ai</span>
          <span style={{ color: "var(--color-text-dim)" }}>▸</span>
          <div style={{ flex: 1 }}>
            {responseLines.slice(0, shown).map((line, i) => (
              <div
                key={`${cycle}-${i}`}
                style={{
                  color:
                    line.kind === "result" ? "var(--color-accent-teal)" : "var(--color-text-secondary)",
                  fontWeight: line.kind === "result" ? 500 : 400,
                  animation: "type-char 200ms ease-out",
                  marginBottom: "0.2rem",
                }}
              >
                {line.text}
              </div>
            ))}
            {shown < responseLines.length &&
              typed.length >= prompt.length && (
                <div style={{ display: "flex", gap: "0.3rem", alignItems: "center", marginTop: "0.3rem" }}>
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--color-text-dim)",
                        animation: `blink 1s ease-in-out infinite`,
                        animationDelay: `${d}ms`,
                      }}
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
