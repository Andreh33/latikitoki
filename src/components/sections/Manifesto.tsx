"use client";

import { ScrollIlluminate } from "@/components/text/ScrollIlluminate";
import { Reveal } from "@/components/text/Reveal";

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="relative mx-auto flex min-h-[90vh] max-w-[1100px] flex-col items-center justify-center px-5 py-32 text-center"
    >
      {/* Glow de fondo */}
      <div
        className="glow-spot anim-pulse-glow left-1/2 top-1/3 h-[40vh] w-[60vw] -translate-x-1/2"
        style={{ background: "var(--holo)" }}
      />

      <Reveal>
        <p className="eyebrow mb-10">/ Manifiesto</p>
      </Reveal>

      <ScrollIlluminate
        as="h2"
        className="font-display text-[clamp(1.8rem,5.2vw,4.2rem)] font-extrabold leading-[1.05]"
        text="No vendemos cosas. Vendemos ese momento en el que se te para el scroll y piensas: lo necesito. La TikiToki es la tienda de lo que se lleva, antes de que se lleve."
        accent={[5, 6, 11, 12, 18, 19, 28, 29, 30]}
      />

      <Reveal delay={0.2}>
        <p className="mt-12 font-mono text-xs tracking-[0.3em] text-niebla">
          DESDE ESPAÑA · PARA TODO EL QUE SCROLLEA
        </p>
      </Reveal>
    </section>
  );
}
