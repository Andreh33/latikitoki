"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/text/Reveal";

const PERKS = [
  "−10% en tu primer pedido",
  "Acceso anticipado a cada drop",
  "Solo lo bueno. Cero spam.",
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) setDone(true);
  };

  return (
    <section id="drop" className="px-5 py-28 md:px-8">
      <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center md:py-24">
        {/* Fondo */}
        <div className="absolute inset-0 -z-10 bg-panel" />
        <div
          className="glow-spot anim-pulse-glow left-1/2 top-0 h-[50vh] w-[70vw] -translate-x-1/2"
          style={{ background: "var(--holo)" }}
        />
        <div className="bg-grid absolute inset-0 -z-10 opacity-60" />

        <Reveal>
          <p className="eyebrow mb-6">/ Lista VIP</p>
          <h2 className="t-h1 mx-auto max-w-[18ch] font-display font-extrabold">
            Entra en <span className="holo-text">El Drop</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-niebla">
            Cada semana elegimos lo que va a petar y avisamos a los de la lista
            antes que a nadie. ¿Te lo vas a perder?
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-[480px]">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-white/15 bg-noche/40 p-8"
              >
                <p className="font-display text-2xl font-extrabold holo-text-static">
                  ¡Estás dentro! ✨
                </p>
                <p className="mt-2 text-sm text-niebla">
                  Revisa tu correo: tu −10% va de camino. Nos vemos en el próximo
                  drop.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -10 }}
                onSubmit={submit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  aria-label="Tu correo electrónico"
                  className="flex-1 rounded-full border border-white/15 bg-noche/40 px-6 py-4 text-crema outline-none transition-colors placeholder:text-niebla/60 focus:border-[rgba(183,162,255,0.6)]"
                />
                <button
                  type="submit"
                  disabled={!valid}
                  data-cursor-label="GO"
                  className="btn-holo justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Quiero entrar →
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {!done && (
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {PERKS.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-1.5 text-xs text-niebla"
                >
                  <span className="holo-text-static">✦</span>
                  {p}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 text-[11px] text-niebla/60">
            Al apuntarte aceptas recibir emails de La TikiToki. Puedes darte de
            baja cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}
