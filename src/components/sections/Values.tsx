"use client";

import { ScrollIlluminate } from "@/components/text/ScrollIlluminate";
import { RevealStagger } from "@/components/text/Reveal";

const VALUES = [
  {
    title: "Curado a mano",
    text: "No te enseñamos 10.000 cosas. Solo lo que de verdad mola y funciona.",
    icon: (
      <path
        d="M16 3l2.5 6L25 11l-6.5 2L16 19l-2.5-6L7 11l6.5-2L16 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Precios sin postureo",
    text: "Lo viral, a precio de verdad. Lo que ves es lo que pagas, sin sustos.",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M5 14l9-9 12 1 1 12-9 9L5 14z" />
        <circle cx="19" cy="11" r="2" />
      </g>
    ),
  },
  {
    title: "Envío a toda España",
    text: "En 24–72h y con seguimiento. Pides hoy, presumes esta semana.",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M3 8h13v12H3zM16 11h6l4 4v5h-10z" />
        <circle cx="8" cy="22" r="2" />
        <circle cx="21" cy="22" r="2" />
      </g>
    ),
  },
  {
    title: "Soporte humano",
    text: "Te contestamos por WhatsApp como te contestaría una amiga. Cero bots fríos.",
    icon: (
      <path
        d="M5 6h22v15H14l-6 5v-5H5V6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
];

export function Values() {
  return (
    <section className="mx-auto max-w-[1300px] px-5 py-28 md:px-8">
      <div className="mb-16 max-w-[20ch]">
        <p className="eyebrow mb-6">/ Por qué nosotras</p>
        <ScrollIlluminate
          as="h2"
          className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.02]"
          text="Una tienda que mola de verdad, no otra más."
          accent={[2, 3, 4]}
        />
      </div>

      <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <RevealStagger.Item key={v.title}>
            <div className="glass group h-full rounded-[1.4rem] p-7 transition-colors duration-300 hover:border-[rgba(183,162,255,0.4)]">
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-full text-lila transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(183,162,255,0.08)" }}
              >
                <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
                  {v.icon}
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-niebla">
                {v.text}
              </p>
            </div>
          </RevealStagger.Item>
        ))}
      </RevealStagger>
    </section>
  );
}
