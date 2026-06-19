"use client";

import { useState } from "react";
import { Reveal } from "@/components/text/Reveal";
import { MysteryBox } from "@/components/games/MysteryBox";
import { HigherLower } from "@/components/games/HigherLower";
import { TikiStudio } from "@/components/games/TikiStudio";
import { TikiMascot } from "@/components/brand/TikiMascot";

type Tab = "caja" | "precios" | "studio";

const TABS: { key: Tab; label: string }[] = [
  { key: "caja", label: "🎁 Caja Sorpresa" },
  { key: "precios", label: "💸 ¿Cuál es más caro?" },
  { key: "studio", label: "🎬 Tiki Studio" },
];

export function Arcade() {
  const [tab, setTab] = useState<Tab>("caja");
  const [studioOpen, setStudioOpen] = useState(false);

  return (
    <section id="juegos" className="relative px-5 py-28 md:px-8">
      <div
        className="glow-spot left-1/2 top-20 h-[40vh] w-[60vw] -translate-x-1/2 opacity-25"
        style={{ background: "var(--holo)" }}
      />

      <Reveal>
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <p className="eyebrow mb-5">/ Zona Tiki</p>
          <h2 className="t-h1 font-display font-extrabold">
            Juega y <span className="holo-text">gana</span>
          </h2>
          <p className="mt-5 text-niebla">
            Premios de verdad, minijuegos absurdamente adictivos y un estudio
            para hacerte viral. Esto no lo tiene nadie más en España.
          </p>
        </div>
      </Reveal>

      {/* Tabs */}
      <div className="mx-auto mb-8 flex max-w-fit flex-wrap justify-center gap-2 rounded-full glass p-1.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            data-cursor
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              tab === t.key ? "text-noche" : "text-niebla hover:text-crema"
            }`}
            style={tab === t.key ? { background: "var(--holo)" } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="mx-auto max-w-3xl">
        <div className="glass-strong rounded-[1.8rem] border border-white/12 p-6 md:p-10">
          {tab === "caja" && <MysteryBox />}
          {tab === "precios" && <HigherLower />}
          {tab === "studio" && (
            <div className="flex flex-col items-center gap-5 py-4 text-center">
              <TikiMascot expression="cool" float className="h-28 w-28" />
              <div>
                <h3 className="font-display text-2xl font-extrabold">
                  Crea tu vídeo con Tiki
                </h3>
                <p className="mt-2 max-w-[40ch] text-sm text-niebla">
                  Enciende la cámara (o un fondo holográfico), pon a Tiki a hacer
                  el tonto, grábalo y descárgalo para TikTok. Con marco de marca
                  incluido.
                </p>
              </div>
              <button
                onClick={() => setStudioOpen(true)}
                data-cursor-label="ACCIÓN"
                className="btn-holo"
              >
                Abrir Tiki Studio 🎬
              </button>
            </div>
          )}
        </div>
      </div>

      <TikiStudio open={studioOpen} onClose={() => setStudioOpen(false)} />
    </section>
  );
}
