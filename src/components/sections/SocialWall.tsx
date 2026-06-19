"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/text/Reveal";
import { tileBackground } from "./ProductMedia";
import { PRODUCTS, type Product } from "@/lib/products";

function PlayGlyph() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-noche/30 backdrop-blur-sm">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path d="M4 2.5v11l9-5.5-9-5.5z" fill="#fff" />
      </svg>
    </span>
  );
}

function Clip({ product }: { product: Product }) {
  return (
    <div className="relative aspect-[9/16] w-[170px] shrink-0 overflow-hidden rounded-[1.2rem] border border-white/10 md:w-[200px]">
      <div className="absolute inset-0" style={tileBackground(product.hue)} />
      <div className="absolute inset-0 bg-gradient-to-t from-noche/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <PlayGlyph />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-mono text-[0.6rem] tracking-widest text-crema/80">
          @latikitoki
        </p>
        <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
      </div>
    </div>
  );
}

export function SocialWall() {
  const rowA = PRODUCTS.slice(0, 15);
  const rowB = PRODUCTS.slice(15);

  return (
    <section className="relative overflow-hidden py-28">
      <Reveal>
        <div className="mx-auto mb-14 max-w-[760px] px-5 text-center">
          <p className="eyebrow mb-6">/ Comunidad</p>
          <h2 className="t-h1 font-display font-extrabold">
            Sal en <span className="holo-text">nuestro feed</span>
          </h2>
          <p className="mt-5 text-niebla">
            Comparte tu pedido, etiqueta a{" "}
            <span className="font-semibold text-crema">@latikitoki</span> y tu
            montaje puede acabar aquí (y en nuestro TikTok). Así de fácil es
            formar parte.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-4">
        <Marquee speed={48}>
          {rowA.map((p) => (
            <Clip key={p.id} product={p} />
          ))}
        </Marquee>
        <Marquee speed={54} reverse>
          {rowB.map((p) => (
            <Clip key={p.id} product={p} />
          ))}
        </Marquee>
      </div>

      {/* Difuminado lateral */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-noche to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-noche to-transparent" />
    </section>
  );
}
