import Image from "next/image";
import type { CategoryKey, Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Iconos de línea por categoría (placeholder elegante mientras no hay foto). */
const GLYPHS: Record<CategoryKey, React.ReactNode> = {
  iluminacion: (
    <path
      d="M32 8a16 16 0 0 0-9 29c1.5 1 2 2.3 2 4v3h14v-3c0-1.7.5-3 2-4a16 16 0 0 0-9-29ZM27 52h10M29 58h6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  tech: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="20" y="20" width="24" height="24" rx="4" />
      <path d="M28 28h8v8h-8zM26 14v6M38 14v6M26 44v6M38 44v6M14 26h6M14 38h6M44 26h6M44 38h6" />
    </g>
  ),
  hogar: (
    <path
      d="M14 30 32 14l18 16M19 28v22h26V28M28 50V38h8v12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  selfcare: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 12c2 8 6 12 14 14-8 2-12 6-14 14-2-8-6-12-14-14 8-2 12-6 14-14Z" />
      <path d="M48 40c1 3.5 2.5 5 6 6-3.5 1-5 2.5-6 6-1-3.5-2.5-5-6-6 3.5-1 5-2.5 6-6Z" />
    </g>
  ),
  accesorios: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M24 22h16l8 10-16 18-16-18 8-10Z" />
      <path d="M16 32h32M28 22l-4 10 8 18M36 22l4 10-8 18" />
    </g>
  ),
};

export function tileBackground(hue: number): React.CSSProperties {
  return {
    backgroundImage: `
      radial-gradient(110% 110% at 25% 18%, hsl(${hue} 92% 72% / 0.9), transparent 55%),
      radial-gradient(120% 120% at 85% 95%, hsl(${(hue + 55) % 360} 88% 68% / 0.85), transparent 55%),
      radial-gradient(85% 85% at 72% 18%, hsl(${(hue + 200) % 360} 85% 72% / 0.4), transparent 60%),
      linear-gradient(150deg, #1b1238, #0b0620)
    `,
  };
}

export function ProductMedia({
  product,
  className,
  rounded = "rounded-2xl",
}: {
  product: Product;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", rounded, className)}
      style={product.image ? undefined : tileBackground(product.hue)}
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <>
          {/* brillo superior */}
          <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
          {/* glifo de categoría */}
          <svg
            viewBox="0 0 64 64"
            className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 text-white/85 mix-blend-overlay drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
            aria-hidden
          >
            {GLYPHS[product.category]}
          </svg>
          {/* orbe flotante */}
          <div className="anim-float absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
          {/* grano */}
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2280%22%20height=%2280%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.85%22%20numOctaves=%222%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        </>
      )}
    </div>
  );
}
