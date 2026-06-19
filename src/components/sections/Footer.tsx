"use client";

import { useScrollTo } from "@/components/providers/SmoothScroll";
import { BrandMark } from "@/components/brand/BrandMark";

const PAY = ["Visa", "Mastercard", "PayPal", "Bizum", "Apple Pay", "G Pay"];

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.4c-1.3.1-2.5-.3-3.6-1v5.4c0 4.3-3.6 6.9-7 5.7-3.3-1.1-4.2-5.4-1.6-7.8 1.1-1 2.6-1.4 4-1.1v2.6c-.5-.2-1.1-.2-1.7 0-1.4.6-1.5 2.6-.2 3.3 1.2.7 2.8-.1 2.8-1.6V3h3.4z" />
    </svg>
  );
}
function InstaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const scrollTo = useScrollTo();

  const COLS = [
    {
      title: "Tienda",
      links: [
        { label: "Todo el catálogo", action: () => scrollTo("#tienda") },
        { label: "Categorías", action: () => scrollTo("#categorias") },
        { label: "Lo que se lleva", action: () => scrollTo("#featured") },
        { label: "El Drop", action: () => scrollTo("#drop") },
      ],
    },
    {
      title: "Ayuda",
      links: [
        { label: "Envíos y entregas", href: "#" },
        { label: "Devoluciones", href: "#" },
        { label: "Seguir mi pedido", href: "#" },
        { label: "Preguntas frecuentes", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Aviso legal", href: "#" },
        { label: "Privacidad", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Términos", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-noche pt-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-5">
          {/* Marca */}
          <div className="col-span-2">
            <BrandMark size="lg" />
            <p className="mt-5 max-w-[34ch] text-sm text-niebla">
              La tienda de lo viral, antes que nadie. Gadgets, luz y aesthetic
              para tu cuarto, tu glow-up y tu vibe.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.tiktok.com/@latikitoki"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-crema transition-all hover:border-[rgba(183,162,255,0.6)] hover:text-lila"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://www.instagram.com/latikitoki"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-crema transition-all hover:border-[rgba(183,162,255,0.6)] hover:text-lila"
              >
                <InstaIcon />
              </a>
            </div>
          </div>

          {/* Columnas */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-niebla">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"action" in l && l.action ? (
                      <button
                        onClick={l.action}
                        data-cursor
                        className="text-sm text-crema/80 transition-colors hover:text-crema"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={(l as { href: string }).href}
                        data-cursor
                        className="text-sm text-crema/80 transition-colors hover:text-crema"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pagos */}
        <div className="hairline" />
        <div className="flex flex-col items-center justify-between gap-5 py-7 md:flex-row">
          <p className="font-mono text-[0.7rem] tracking-wide text-niebla">
            © 2026 La TikiToki · Hecho con{" "}
            <span className="holo-text-static">💜</span> en España
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PAY.map((p) => (
              <span
                key={p}
                className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-niebla"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Wordmark gigante */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="holo-text translate-y-[18%] text-center font-display text-[24vw] font-extrabold leading-none opacity-[0.10]">
          TIKITOKI
        </p>
      </div>
    </footer>
  );
}
