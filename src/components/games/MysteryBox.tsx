"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Confetti } from "@/components/ui/Confetti";
import { TikiMascot } from "@/components/brand/TikiMascot";
import { useScrollTo } from "@/components/providers/SmoothScroll";

interface Prize {
  label: string;
  sub: string;
  code: string;
  weight: number;
}

// Premios "sorpresa" — los define la tienda. Puede tocar cualquiera.
const PRIZES: Prize[] = [
  { label: "−10% en tu pedido", sub: "En todo el carrito", code: "SORPRESA10", weight: 30 },
  { label: "−15% en tu pedido", sub: "En todo el carrito", code: "SORPRESA15", weight: 18 },
  { label: "Envío gratis", sub: "Sin pedido mínimo", code: "ENVIOTIKI", weight: 22 },
  { label: "−20% en tu pedido", sub: "El premio gordo", code: "SORPRESA20", weight: 8 },
  { label: "5€ de regalo", sub: "Desde 25€ de compra", code: "TIKI5", weight: 14 },
  { label: "Producto sorpresa gratis", sub: "Con pedidos +30€", code: "REGALOTIKI", weight: 8 },
];

function pickPrize(): Prize {
  const total = PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const p of PRIZES) {
    if ((r -= p.weight) <= 0) return p;
  }
  return PRIZES[0];
}

interface Saved {
  date: string;
  prize: Prize;
  box: number;
}

const today = () => new Date().toISOString().slice(0, 10);

export function MysteryBox() {
  const [saved, setSaved] = useLocalStorage<Saved | null>("tk-box", null);
  const [chosen, setChosen] = useState<number | null>(null);
  const [opening, setOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const scrollTo = useScrollTo();

  const playedToday = saved?.date === today();

  useEffect(() => {
    if (playedToday) {
      setChosen(saved!.box);
      setRevealed(true);
    }
  }, [playedToday, saved]);

  const pick = (i: number) => {
    if (chosen !== null) return;
    const prize = pickPrize();
    setChosen(i);
    setOpening(true);
    window.setTimeout(() => {
      setConfetti(true);
      setRevealed(true);
      setSaved({ date: today(), prize, box: i });
      window.setTimeout(() => setConfetti(false), 2600);
    }, 850);
  };

  const prize = saved?.prize;

  return (
    <div className="relative flex flex-col items-center">
      <Confetti show={confetti} />

      {!revealed ? (
        <>
          <p className="mb-8 text-center text-niebla">
            Elige una caja. Hoy puede tocarte cualquier cosa 👀
          </p>
          <div className="flex flex-wrap items-end justify-center gap-5 md:gap-8">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={chosen !== null}
                data-cursor-label="ÁBREME"
                className={`group relative transition-all duration-500 ${
                  chosen === null
                    ? "anim-float"
                    : chosen === i
                      ? "scale-110"
                      : "scale-90 opacity-20"
                }`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <GiftBox shaking={opening && chosen === i} />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center text-center">
          <TikiMascot
            expression="love"
            float
            className="mb-4 h-24 w-24 drop-shadow-[0_8px_30px_rgba(139,92,246,0.55)]"
          />
          <p className="font-mono text-xs tracking-[0.25em] text-niebla">
            {playedToday && chosen !== null ? "TU PREMIO DE HOY" : "¡HAS GANADO!"}
          </p>
          <p className="mt-2 font-display text-3xl font-extrabold holo-text-static md:text-4xl">
            {prize?.label}
          </p>
          <p className="mt-1 text-sm text-niebla">{prize?.sub}</p>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
            <span className="font-mono text-lg font-bold tracking-widest text-crema">
              {prize?.code}
            </span>
            <CopyButton code={prize?.code ?? ""} />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollTo("#tienda")}
              data-cursor
              className="btn-holo"
            >
              Usarlo en la tienda →
            </button>
          </div>
          <p className="mt-4 text-xs text-niebla">
            Vuelve mañana para abrir otra caja 🎁
          </p>
        </div>
      )}
    </div>
  );
}

function GiftBox({ shaking }: { shaking: boolean }) {
  return (
    <div
      className="relative h-32 w-32 md:h-36 md:w-36"
      style={shaking ? { animation: "tikiWiggle 0.12s linear infinite" } : undefined}
    >
      {/* cuerpo */}
      <div className="holo-ring absolute inset-x-0 bottom-0 top-7 rounded-2xl" />
      <div className="absolute inset-x-0 bottom-0 top-7 rounded-2xl bg-[radial-gradient(120%_120%_at_50%_0%,rgba(183,162,255,0.25),transparent_60%)]" />
      {/* tapa */}
      <div
        className="absolute inset-x-[-4px] top-3 h-8 rounded-xl border border-white/15"
        style={{ background: "var(--holo)" }}
      />
      {/* cinta vertical */}
      <div
        className="absolute bottom-0 left-1/2 top-7 w-4 -translate-x-1/2 opacity-80"
        style={{ background: "var(--holo)" }}
      />
      {/* lazo */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 text-2xl">🎀</div>
      {/* interrogante */}
      <div className="absolute inset-0 top-7 flex items-center justify-center">
        <span className="font-display text-3xl font-extrabold text-noche/80">
          ?
        </span>
      </div>
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(code).then(() => {
          setOk(true);
          window.setTimeout(() => setOk(false), 1500);
        });
      }}
      data-cursor
      aria-label="Copiar código"
      className="rounded-lg border border-white/15 px-2 py-1 text-[11px] text-niebla transition-colors hover:text-crema"
    >
      {ok ? "✓" : "copiar"}
    </button>
  );
}
