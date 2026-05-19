"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorBlob() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(my, { stiffness: 500, damping: 40, mass: 0.5 });

  const blobX = useSpring(mx, { stiffness: 80, damping: 20, mass: 1 });
  const blobY = useSpring(my, { stiffness: 80, damping: 20, mass: 1 });

  useEffect(() => {
    // Desktop only
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role=button]"
      );
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* Soft blob */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "380px",
          height: "380px",
          translateX: blobX,
          translateY: blobY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(6,201,168,0.08), transparent 65%)",
          pointerEvents: "none",
          zIndex: 50,
          mixBlendMode: "screen",
        }}
      />
      {/* Dot */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "14px" : "6px",
          height: hovering ? "14px" : "6px",
          translateX: springX,
          translateY: springY,
          x: "-50%",
          y: "-50%",
          background: hovering ? "transparent" : "var(--color-accent-teal)",
          border: hovering ? "1.5px solid var(--color-accent-teal)" : "none",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1000,
          transition: "width 200ms, height 200ms, background 200ms",
        }}
      />
    </>
  );
}
