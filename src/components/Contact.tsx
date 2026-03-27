"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

const steps = [
  {
    id: 1,
    question: "What brings you here?",
    options: [
      { id: "a", label: "Build from scratch", desc: "I have a product idea and need to build it" },
      { id: "b", label: "Add AI capabilities", desc: "I need AI added to an existing product" },
      { id: "c", label: "Scale infrastructure", desc: "I need backend systems to handle growth" },
      { id: "d", label: "Explore AI agents", desc: "I want to see what's possible with AI agents" },
    ],
  },
  {
    id: 2,
    question: "What stage is your project?",
    options: [
      { id: "a", label: "Pre-seed / Idea stage", desc: "Need an MVP to validate the concept" },
      { id: "b", label: "Seed", desc: "Need a production-ready V1" },
      { id: "c", label: "Series A+", desc: "Need to move fast and scale" },
      { id: "d", label: "Enterprise", desc: "Bespoke, high-complexity requirements" },
    ],
  },
  {
    id: 3,
    question: "What's your timeline?",
    options: [
      { id: "a", label: "ASAP", desc: "Within the next 4 weeks" },
      { id: "b", label: "1–3 months", desc: "Measured, structured rollout" },
      { id: "c", label: "3–6 months", desc: "Phased, long-horizon build" },
      { id: "d", label: "Still planning", desc: "Exploring options first" },
    ],
  },
];

type Answers = { [key: number]: string };

export default function Contact() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const progress = submitted ? 100 : (step / 4) * 100;
  const currentStep = steps[step - 1];

  const handleOption = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [step]: optionId }));
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-500/[0.04] blur-[140px] pointer-events-none" />
      <div className="absolute top-[15%] right-[10%] w-[250px] h-[250px] rounded-full bg-white/[0.008] blur-[80px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[640px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-12"
          style={{ perspective: "800px" }}
        >
          <p className="section-label mb-4">Let&apos;s Talk</p>
          <h2 className="section-heading text-[clamp(2.2rem,5.5vw,3.4rem)] gradient-text mb-4">
            Tell us about your project
          </h2>
          <p className="text-[17px] font-body text-white/80 max-w-[420px] mx-auto leading-[1.8]">
            Four quick questions — then we come back with a real proposal, not a price list.
          </p>
        </motion.div>

        {/* Sales assistant card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          className="card-shadow rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-sm p-8 md:p-10 hover:border-white/[0.1] transition-all"
        >
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-white/68 uppercase tracking-[0.15em]">
                {submitted ? "Complete" : `Step ${step} of 4`}
              </span>
              <span className="text-[11px] font-mono text-purple-400/60">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Steps 1–3: option selection */}
            {!submitted && step <= 3 && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              >
                <h3 className="text-[20px] font-display font-semibold text-white/90 tracking-[-0.02em] mb-6">
                  {currentStep.question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.options.map((opt, oi) => {
                    const isSelected = answers[step] === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: oi * 0.06 }}
                        onClick={() => handleOption(opt.id)}
                        whileHover={{ scale: 1.03, borderColor: "rgba(139,92,246,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        className="text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer"
                        style={{
                          borderColor: isSelected ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.07)",
                          background: isSelected ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.02)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[17px] font-body font-medium text-white/80 mb-0.5">{opt.label}</p>
                            <p className="text-[17px] font-body text-white/75 leading-[1.6]">{opt.desc}</p>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(139,92,246,0.3)", border: "1px solid rgba(139,92,246,0.5)" }}>
                              <svg width="9" height="9" fill="none" stroke="rgba(167,139,250,1)" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Back button */}
                {step > 1 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-5 text-[14px] font-mono text-white/68 hover:text-white/70 transition-colors flex items-center gap-1.5"
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 12H5m6-7l-7 7 7 7" />
                    </svg>
                    Back
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Step 4: contact details */}
            {!submitted && step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-[20px] font-display font-semibold text-white/90 tracking-[-0.02em] mb-2">
                  Almost done — how should we reach you?
                </h3>
                <p className="text-[17px] font-body text-white/75 mb-6">We&apos;ll send a scope-matched proposal within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-white/75 uppercase tracking-[0.2em] mb-2">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3.5 text-[17px] font-body rounded-lg bg-white/[0.03] border border-white/[0.07] text-white/80 placeholder:text-white/32 outline-none focus:border-purple-500/40 focus:shadow-[0_0_15px_rgba(139,92,246,0.06)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-white/75 uppercase tracking-[0.2em] mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-4 py-3.5 text-[17px] font-body rounded-lg bg-white/[0.03] border border-white/[0.07] text-white/80 placeholder:text-white/32 outline-none focus:border-purple-500/40 focus:shadow-[0_0_15px_rgba(139,92,246,0.06)] transition-all"
                      />
                    </div>
                  </div>

                  <MagneticButton strength={0.25} className="w-full">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full btn-neon font-body font-semibold text-[14px] py-3.5 rounded-xl flex items-center justify-center gap-2.5"
                    >
                      Get My Custom Proposal
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14m-6-6l6 6-6 6" />
                      </svg>
                    </motion.button>
                  </MagneticButton>
                </form>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setStep(3)}
                  className="mt-4 text-[14px] font-mono text-white/68 hover:text-white/70 transition-colors flex items-center gap-1.5"
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 12H5m6-7l-7 7 7 7" />
                  </svg>
                  Back
                </motion.button>
              </motion.div>
            )}

            {/* Confirmation */}
            {submitted && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="text-center py-6"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 0 20px rgba(139,92,246,0.2)" }}
                >
                  <svg width="22" height="22" fill="none" stroke="rgba(167,139,250,1)" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-display font-semibold text-white/90 tracking-[-0.02em] mb-3">
                  You&apos;re in the queue
                </h3>
                <p className="text-[17px] font-body text-white/82 max-w-[380px] mx-auto leading-[1.8]">
                  We&apos;ll analyze your answers and reach out within 24 hours with a no-fluff, scope-matched proposal.
                </p>
                <p className="mt-5 text-[14px] font-mono text-white/68">
                  Questions in the meantime?{" "}
                  <a href="mailto:hello@dualmindlabs.com" className="text-purple-400/60 hover:text-purple-400 transition-colors underline underline-offset-2">
                    hello@dualmindlabs.com
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
