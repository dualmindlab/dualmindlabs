"use client";

interface SectionLabelProps {
  index: string;
  text: string;
}

export default function SectionLabel({ index, text }: SectionLabelProps) {
  return (
    <p
      className="text-eyebrow"
      style={{
        color: "var(--color-accent-teal)",
        marginBottom: "0.85rem",
      }}
    >
      {index} / {text}
    </p>
  );
}
