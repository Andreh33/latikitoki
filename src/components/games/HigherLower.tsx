"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductMedia } from "@/components/sections/ProductMedia";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PRODUCTS, type Product } from "@/lib/products";
import { euro } from "@/lib/utils";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 650;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      ref.current = to * eased;
      setV(ref.current);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{euro(v)}</>;
}

export function HigherLower() {
  const [deck, setDeck] = useState<Product[]>(() => shuffle(PRODUCTS));
  const [pos, setPos] = useState(0);
  const [score, setScore] = useState(0);
  const [best, setBest] = useLocalStorage("tk-hl-best", 0);
  const [phase, setPhase] = useState<"play" | "reveal" | "over">("play");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const left = deck[pos % deck.length];
  const right = deck[(pos + 1) % deck.length];

  const guess = (choice: "higher" | "lower") => {
    if (phase !== "play") return;
    const ok =
      choice === "higher"
        ? right.price >= left.price
        : right.price <= left.price;
    setCorrect(ok);
    setPhase("reveal");

    window.setTimeout(() => {
      if (ok) {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > best) setBest(newScore);
        // ampliar mazo si hace falta, evitando repetir el producto actual
        setPos((p) => {
          const next = p + 1;
          if (next + 2 >= deck.length) {
            setDeck((d) => [...d, ...shuffle(PRODUCTS).filter((x) => x.id !== right.id)]);
          }
          return next;
        });
        setPhase("play");
        setCorrect(null);
      } else {
        setPhase("over");
      }
    }, 1100);
  };

  const restart = () => {
    setDeck(shuffle(PRODUCTS));
    setPos(0);
    setScore(0);
    setPhase("play");
    setCorrect(null);
    setCopied(false);
  };

  const wonCoupon = score >= 5;
  const share = async () => {
    const text = `He hecho ${score} aciertos seguidos en "¿Cuál es más caro?" de La TikiToki 💜 ¿Me ganas? latikitoki.com`;
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      }
    } catch {
      /* cancelado */
    }
  };

  return (
    <div className="relative">
      {/* Marcador */}
      <div className="mb-5 flex items-center justify-center gap-6 font-mono text-sm">
        <span className="text-niebla">
          Aciertos:{" "}
          <span className="font-bold text-crema">{score}</span>
        </span>
        <span className="text-niebla">
          Récord: <span className="font-bold holo-text-static">{best}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {/* Izquierda (precio visible) */}
        <Card product={left}>
          <p className="text-xs text-niebla">cuesta</p>
          <p className="font-display text-3xl font-extrabold holo-text-static">
            {euro(left.price)}
          </p>
        </Card>

        {/* VS + botones */}
        <div className="flex flex-row items-center justify-center gap-3 sm:flex-col">
          <span className="font-display text-xl font-extrabold text-niebla">
            VS
          </span>
          <button
            onClick={() => guess("higher")}
            disabled={phase !== "play"}
            data-cursor
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-all hover:border-azul hover:text-azul disabled:opacity-40"
          >
            Más caro ⬆
          </button>
          <button
            onClick={() => guess("lower")}
            disabled={phase !== "play"}
            data-cursor
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-all hover:border-rosa hover:text-rosa disabled:opacity-40"
          >
            Más barato ⬇
          </button>
        </div>

        {/* Derecha (precio oculto) */}
        <Card product={right}>
          {phase === "reveal" || phase === "over" ? (
            <>
              <p className="text-xs text-niebla">cuesta</p>
              <p
                className={`font-display text-3xl font-extrabold ${
                  correct ? "text-azul" : "text-rosa"
                }`}
              >
                <CountUp to={right.price} /> {correct ? "✓" : "✗"}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-niebla">¿más caro o más barato?</p>
              <p className="font-display text-3xl font-extrabold text-niebla/40">
                ??,?? €
              </p>
            </>
          )}
        </Card>
      </div>

      {/* Game over */}
      {phase === "over" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-noche/85 p-6 text-center backdrop-blur-md">
          <p className="font-display text-3xl font-extrabold">
            {score} aciertos
          </p>
          <p className="mt-1 text-sm text-niebla">
            {score >= best && score > 0
              ? "¡Nuevo récord! 🔥"
              : `Tu récord: ${best}`}
          </p>

          {wonCoupon && (
            <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
              <p className="text-xs text-niebla">¡Premio desbloqueado!</p>
              <p className="font-mono text-lg font-bold holo-text-static">
                JUEGA10
              </p>
              <p className="text-[11px] text-niebla">−10% en tu pedido</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button onClick={restart} data-cursor className="btn-holo">
              Jugar otra vez
            </button>
            <button onClick={share} data-cursor className="btn-ghost">
              {copied ? "¡Copiado!" : "Compartir récord"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <ProductMedia
        product={product}
        className="aspect-square w-full max-w-[180px]"
        rounded="rounded-2xl"
      />
      <p className="text-center font-display text-base font-bold leading-tight">
        {product.name}
      </p>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}
