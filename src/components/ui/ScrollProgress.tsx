"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Barra de progreso = un cometa que cruza el cielo dejando estela holográfica. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.3,
  });
  const left = useTransform(p, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[9997] h-[3px]"
    >
      {/* estela */}
      <motion.div
        style={{ scaleX: p, background: "var(--holo)" }}
        className="h-full w-full origin-left opacity-90 shadow-[0_0_18px_rgba(139,92,246,0.85)]"
      />
      {/* cometa */}
      <motion.div
        style={{ left }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute right-1 top-1/2 h-[2px] w-10 -translate-y-1/2 rounded-full bg-gradient-to-l from-white/90 to-transparent blur-[1px]" />
        <span
          className="relative block h-2.5 w-2.5 rounded-full bg-white"
          style={{ animation: "cometGlow 2.4s ease-in-out infinite" }}
        />
      </motion.div>
    </div>
  );
}
