"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra de progreso holográfica fija en la parte superior. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, background: "var(--holo)" }}
      className="fixed left-0 top-0 z-[9997] h-[3px] w-full origin-left shadow-[0_0_18px_rgba(139,92,246,0.8)]"
    />
  );
}
