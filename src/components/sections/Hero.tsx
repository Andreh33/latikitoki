"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;
const D = 2.1; // espera a que la cortina del preloader se levante

const TICKER = [
  "NUEVO DROP CADA SEMANA",
  "ENVÍO A TODA ESPAÑA",
  "PAGO 100% SEGURO",
  "DEVOLUCIONES 14 DÍAS",
  "LO VIRAL, ANTES QUE NADIE",
];

export function Hero() {
  const scrollTo = useScrollTo();
  const lite = useMediaQuery("(max-width: 820px)");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Lienzo WebGL */}
      <div className="absolute inset-0">
        <HeroCanvas lite={lite} />
      </div>

      {/* Viñeta + asiento oscuro para legibilidad del texto */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_26%,transparent_22%,rgba(7,4,17,0.5)_62%,rgba(7,4,17,0.96))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(56%_50%_at_50%_47%,rgba(7,4,17,0.74),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noche via-noche/40 to-transparent" />

      {/* Contenido */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          textShadow: "0 2px 34px rgba(7,4,17,0.7)",
        }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1180px] flex-col items-center justify-center px-5 pb-24 pt-28 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D, duration: 0.8, ease: EASE }}
          className="eyebrow mb-6 flex items-center gap-3"
          style={{ color: "#ece6ff" }}
        >
          <span className="holo-text-static">✦</span> Lo viral, antes que nadie
          <span className="holo-text-static">✦</span>
        </motion.p>

        <h1 className="font-display font-extrabold leading-[0.82]">
          <span className="mb-1 block overflow-hidden">
            <motion.span
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ delay: D + 0.1, duration: 1, ease: EASE }}
              className="block text-[clamp(1.4rem,4vw,2.6rem)] font-semibold tracking-[0.05em] text-niebla"
            >
              LA
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              initial={{ y: "118%" }}
              animate={{ y: 0 }}
              transition={{ delay: D + 0.2, duration: 1.1, ease: EASE }}
              className="holo-text block text-[clamp(3.4rem,15vw,12.5rem)]"
              style={{
                textShadow:
                  "0 0 34px rgba(139,92,246,0.7), 0 10px 55px rgba(0,0,0,0.6)",
              }}
            >
              TIKITOKI
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.5, duration: 0.9, ease: EASE }}
          className="t-lead mx-auto mt-7 max-w-[36ch] text-balance text-crema/90"
        >
          Gadgets, luz y aesthetic que petan en tu feed. Tu cuarto, tu glow-up,
          tu vibe — en una sola tienda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: D + 0.7, duration: 0.9, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.45}>
            <button
              onClick={() => scrollTo("#tienda")}
              data-cursor-label="VAMOS"
              className="btn-holo"
            >
              Ver la tienda
              <span aria-hidden>→</span>
            </button>
          </Magnetic>
          <Magnetic strength={0.45}>
            <button
              onClick={() => scrollTo("#drop")}
              data-cursor
              className="btn-ghost"
            >
              El Drop de la semana
            </button>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: D + 1, duration: 1 }}
          className="mt-9 font-mono text-[0.7rem] tracking-[0.2em] text-niebla/70"
        >
          ENVÍO A TODA ESPAÑA · PAGO SEGURO · DEVOLUCIONES 14 DÍAS
        </motion.p>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.35em] text-niebla">
          DESLIZA
        </span>
        <span className="relative h-10 w-[1px] overflow-hidden bg-white/15">
          <span
            className="absolute left-0 top-0 h-4 w-full"
            style={{
              background: "var(--holo)",
              animation: "scrollDot 1.8s ease-in-out infinite",
            }}
          />
        </span>
      </motion.div>

      {/* Ticker inferior */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/5 bg-noche/30 py-3 backdrop-blur-sm">
        <Marquee speed={26}>
          {TICKER.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-mono text-xs tracking-[0.25em] text-niebla"
            >
              {t}
              <span className="holo-text-static">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
