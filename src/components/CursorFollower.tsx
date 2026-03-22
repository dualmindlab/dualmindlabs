"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  // Dot — fast spring
  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  // Ring — slower, trails behind
  const sRingX = useSpring(ringX, { stiffness: 120, damping: 20 });
  const sRingY = useSpring(ringY, { stiffness: 120, damping: 20 });

  // Logo — even lazier, floats behind
  const logoX = useSpring(ringX, { stiffness: 60, damping: 22 });
  const logoY = useSpring(ringY, { stiffness: 60, damping: 22 });

  // Glow — laziest
  const glowX = useSpring(ringX, { stiffness: 40, damping: 25 });
  const glowY = useSpring(ringY, { stiffness: 40, damping: 25 });

  // Logo rotation based on cursor velocity
  const logoRotate = useTransform(cursorX, (latest) => {
    return (latest % 360) * 0.1;
  });

  const hovering = useRef(false);
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 20 });
  const opacitySpring = useSpring(1, { stiffness: 300, damping: 25 });
  const logoScaleSpring = useSpring(0.8, { stiffness: 200, damping: 18 });
  const logoOpacitySpring = useSpring(0.25, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      if (isInteractive && !hovering.current) {
        hovering.current = true;
        scaleSpring.set(2.2);
        opacitySpring.set(0.5);
        logoScaleSpring.set(1.2);
        logoOpacitySpring.set(0.5);
      } else if (!isInteractive && hovering.current) {
        hovering.current = false;
        scaleSpring.set(1);
        opacitySpring.set(1);
        logoScaleSpring.set(0.8);
        logoOpacitySpring.set(0.25);
      }
    };

    const leave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      ringX.set(-100);
      ringY.set(-100);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY, ringX, ringY, scaleSpring, opacitySpring, logoScaleSpring, logoOpacitySpring]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      {/* Large ambient glow that lazily follows */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.018) 0%, rgba(255,255,255,0.005) 40%, transparent 70%)",
        }}
      />

      {/* Floating logo — trails lazily behind cursor */}
      <motion.div
        className="absolute"
        style={{
          x: logoX,
          y: logoY,
          translateX: "-50%",
          translateY: "-50%",
          scale: logoScaleSpring,
          opacity: logoOpacitySpring,
          rotate: logoRotate,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M9 9h5c3.314 0 6 2.239 6 5s-2.686 5-6 5H9V9z"
            stroke="#fff"
            strokeWidth="1.5"
            fill="none"
            strokeOpacity="0.6"
          />
          <path
            d="M17 13h5c1.657 0 3 1.343 3 3s-1.343 3-3 3h-5"
            stroke="#fff"
            strokeWidth="1.5"
            fill="none"
            strokeOpacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-white/[0.08]"
        style={{
          width: 40,
          height: 40,
          x: sRingX,
          y: sRingY,
          translateX: "-50%",
          translateY: "-50%",
          scale: scaleSpring,
          opacity: opacitySpring,
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full bg-white/30"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 12px 2px rgba(255,255,255,0.1), 0 0 30px 6px rgba(255,255,255,0.04)",
        }}
      />
    </div>
  );
}
