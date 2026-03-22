"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.01] blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <Logo size={40} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[clamp(5rem,15vw,9rem)] font-display font-black tracking-[-0.06em] leading-none gradient-text"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-[16px] font-body text-white/35 mt-4 mb-8"
        >
          This page doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.a
          href="/"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 bg-white text-black font-body font-semibold text-[14px] px-6 py-3 rounded-xl transition-all"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
}
