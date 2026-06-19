"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/text/Reveal";
import { Wallpapers } from "@/components/club/Wallpapers";
import { Confetti } from "@/components/ui/Confetti";
import { TikiMascot } from "@/components/brand/TikiMascot";
import { useStreak } from "@/hooks/useStreak";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

const MugCanvas = dynamic(() => import("@/components/brand/MugCanvas"), {
  ssr: false,
});

type Modal = "racha" | "referidos" | "fondos" | null;

export function ClubSection() {
  const [open, setOpen] = useState<Modal>(null);
  const streak = useStreak();

  const cards = [
    {
      key: "racha" as const,
      emoji: "🔥",
      title: "Tu racha diaria",
      desc: "Entra 35 días seguidos y te llevas una taza de La TikiToki.",
      foot: streak.ready ? `Llevas ${streak.count} día${streak.count === 1 ? "" : "s"}` : "—",
    },
    {
      key: "referidos" as const,
      emoji: "💸",
      title: "Trae una amiga",
      desc: "5€ para ti y 5€ para ella cuando haga su primer pedido.",
      foot: "Tu código personal",
    },
    {
      key: "fondos" as const,
      emoji: "📱",
      title: "Fondos gratis",
      desc: "Wallpapers holográficos para tu móvil. Descárgalos ya.",
      foot: "4 diseños · gratis",
    },
  ];

  return (
    <section id="club" className="mx-auto max-w-[1300px] px-5 py-28 md:px-8">
      <Reveal>
        <div className="mb-12 text-center">
          <p className="eyebrow mb-5">/ Club TikiToki</p>
          <h2 className="t-h1 font-display font-extrabold">
            Más que una <span className="holo-text">tienda</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-niebla">
            Recompensas de verdad por estar aquí. Porque lo bueno se comparte.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.08}>
            <button
              onClick={() => setOpen(c.key)}
              data-cursor-label="ABRIR"
              className="glass group flex h-full w-full flex-col items-start rounded-[1.6rem] p-7 text-left transition-colors duration-300 hover:border-[rgba(183,162,255,0.45)]"
            >
              <span
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-transform group-hover:scale-110"
                style={{ background: "rgba(183,162,255,0.1)" }}
              >
                {c.emoji}
              </span>
              <h3 className="font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-niebla">{c.desc}</p>
              <span className="mt-5 font-mono text-[0.65rem] tracking-[0.15em] text-lila">
                {c.foot} →
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(null)}>
        {open === "racha" && <StreakContent streak={streak} />}
        {open === "referidos" && <ReferralContent />}
        {open === "fondos" && <Wallpapers />}
      </Modal>
    </section>
  );
}

function Modal({
  open,
  onClose,
  children,
}: {
  open: Modal;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-noche/85 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            className="glass-strong relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.8rem] border border-white/12 p-7 md:p-9"
          >
            <button
              onClick={onClose}
              data-cursor
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-niebla hover:text-crema"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function StreakContent({ streak }: { streak: ReturnType<typeof useStreak> }) {
  const [confetti, setConfetti] = useState(false);
  const reached = streak.count >= 35;
  const remaining = Math.max(0, 35 - streak.count);

  return (
    <div className="flex flex-col items-center text-center">
      <Confetti show={confetti} />
      <p className="font-mono text-xs tracking-[0.25em] text-lila">
        / TU PREMIO
      </p>
      <div className="h-56 w-full">
        <MugCanvas />
      </div>
      <h3 className="font-display text-2xl font-extrabold">
        Taza oficial de La TikiToki
      </h3>
      <p className="mt-2 text-sm text-niebla">
        {reached
          ? "¡La has desbloqueado! 🎉"
          : `Entra cada día. Te faltan ${remaining} días para ganarla gratis.`}
      </p>

      {/* progreso 35 días */}
      <div className="mt-6 grid grid-cols-7 gap-2 sm:grid-cols-[repeat(12,minmax(0,1fr))]">
        {Array.from({ length: 35 }, (_, i) => {
          const filled = i < streak.count;
          const current = i === streak.count - 1;
          return (
            <span
              key={i}
              className={cn(
                "h-5 w-5 rounded-full border",
                filled
                  ? "border-transparent"
                  : "border-white/15 bg-white/[0.03]",
                current && "anim-pulse-glow",
              )}
              style={filled ? { background: "var(--holo)" } : undefined}
            />
          );
        })}
      </div>
      <p className="mt-3 font-mono text-sm">
        <span className="font-bold holo-text-static">{streak.count}</span>
        <span className="text-niebla"> / 35 días · récord {streak.best}</span>
      </p>

      <div className="mt-6">
        {reached && !streak.claimed ? (
          <button
            onClick={() => {
              streak.claim();
              setConfetti(true);
              setTimeout(() => setConfetti(false), 2600);
            }}
            data-cursor
            className="btn-holo"
          >
            Reclamar mi taza 🎉
          </button>
        ) : reached && streak.claimed ? (
          <p className="text-sm holo-text-static">
            ✓ Taza reclamada. Te contactaremos para el envío.
          </p>
        ) : (
          <p className="text-xs text-niebla">
            Vuelve mañana para sumar +1 a tu racha 🔥
          </p>
        )}
      </div>
    </div>
  );
}

function ReferralContent() {
  const [code, setCode, ready] = useLocalStorage("tk-ref", "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ready && !code) {
      const rnd = Array.from({ length: 4 }, () =>
        "ABCDEFGHJKMNPQRSTUVWXYZ23456789".charAt(
          Math.floor(Math.random() * 30),
        ),
      ).join("");
      setCode(`TIKI${rnd}`);
    }
  }, [ready, code, setCode]);

  const link = `https://latikitoki.com/?ref=${code}`;
  const share = async () => {
    const text = `Te regalo 5€ en La TikiToki 💜 Usa mi código ${code} en tu primer pedido: ${link}`;
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      /* cancelado */
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <TikiMascot expression="love" float className="mb-3 h-24 w-24" />
      <h3 className="font-display text-2xl font-extrabold">
        Trae una amiga, ganáis las dos
      </h3>
      <p className="mt-2 max-w-[40ch] text-sm text-niebla">
        Comparte tu código. Cuando tu amiga haga su primer pedido,{" "}
        <span className="text-crema">5€ para ella y 5€ para ti</span>. Así de
        fácil.
      </p>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4">
        <span className="font-mono text-2xl font-bold tracking-[0.2em] holo-text-static">
          {code || "······"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={share} data-cursor className="btn-holo">
          {copied ? "¡Copiado!" : "Compartir mi código →"}
        </button>
      </div>
      <p className="mt-4 text-[11px] text-niebla">
        Sin límite de amigas. Cada una, 5€ para las dos.
      </p>
    </div>
  );
}
