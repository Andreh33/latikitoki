"use client";

import { useEffect, useRef } from "react";

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function sparkles(ctx: CanvasRenderingContext2D, w: number, h: number, n: number, color: string) {
  ctx.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const x = (Math.sin(i * 127.1) * 0.5 + 0.5) * w;
    const y = (Math.sin(i * 311.7) * 0.5 + 0.5) * h;
    const s = ((i * 13) % 5) + 1;
    ctx.globalAlpha = 0.3 + ((i * 7) % 7) / 10;
    ctx.fillRect(x, y, s, s);
  }
  ctx.globalAlpha = 1;
}

function brand(ctx: CanvasRenderingContext2D, w: number, h: number, dark = false) {
  ctx.textAlign = "center";
  ctx.fillStyle = dark ? "rgba(7,4,17,0.7)" : "rgba(255,255,255,0.85)";
  ctx.font = `800 ${w * 0.07}px Bricolage Grotesque, Arial, sans-serif`;
  ctx.fillText("LA TIKITOKI", w / 2, h * 0.9);
  ctx.font = `600 ${w * 0.032}px Geist Mono, monospace`;
  ctx.fillText("LO VIRAL, ANTES QUE NADIE", w / 2, h * 0.93);
}

function tiki(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  g.addColorStop(0, "#c8b8ff");
  g.addColorStop(0.5, "#9fe9ff");
  g.addColorStop(1, "#ffb4e2");
  ctx.fillStyle = "#fff3c4";
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * 0.18 : r * 0.34;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    ctx.lineTo(cx + Math.cos(a) * rr, cy - r - r * 0.3 + Math.sin(a) * rr);
  }
  ctx.fill();
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,143,208,0.55)";
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.5, cy + r * 0.3, r * 0.18, r * 0.12, 0, 0, 7);
  ctx.ellipse(cx + r * 0.5, cy + r * 0.3, r * 0.18, r * 0.12, 0, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#1a0f33";
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.42, cy - r * 0.05, r * 0.15, r * 0.19, 0, 0, 7);
  ctx.ellipse(cx + r * 0.42, cy - r * 0.05, r * 0.15, r * 0.19, 0, 0, 7);
  ctx.fill();
  ctx.strokeStyle = "#1a0f33";
  ctx.lineWidth = r * 0.08;
  ctx.beginPath();
  ctx.arc(cx, cy + r * 0.3, r * 0.28, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
}

const DESIGNS: { name: string; draw: DrawFn }[] = [
  {
    name: "Aurora",
    draw: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#1a1240");
      g.addColorStop(0.5, "#3a2b7a");
      g.addColorStop(1, "#0d2c4d");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      const rg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w);
      rg.addColorStop(0, "rgba(183,162,255,0.5)");
      rg.addColorStop(0.5, "rgba(130,230,255,0.18)");
      rg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
      sparkles(ctx, w, h, 120, "#e6dcff");
      brand(ctx, w, h);
    },
  },
  {
    name: "Atardecer",
    draw: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#ff8a4d");
      g.addColorStop(0.45, "#ff5fa8");
      g.addColorStop(1, "#6d3bf5");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,236,180,0.9)";
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.42, w * 0.26, 0, Math.PI * 2);
      ctx.fill();
      sparkles(ctx, w, h, 70, "#fff");
      brand(ctx, w, h);
    },
  },
  {
    name: "Tiki",
    draw: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#241844");
      g.addColorStop(1, "#0d2440");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      sparkles(ctx, w, h, 90, "#cdbcff");
      tiki(ctx, w / 2, h * 0.42, w * 0.22);
      brand(ctx, w, h);
    },
  },
  {
    name: "Tipo",
    draw: (ctx, w, h) => {
      ctx.fillStyle = "#070411";
      ctx.fillRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, "#b7a2ff");
      g.addColorStop(0.5, "#82e6ff");
      g.addColorStop(1, "#ff97d6");
      ctx.fillStyle = g;
      ctx.textAlign = "center";
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.font = `800 ${h * 0.13}px Bricolage Grotesque, Arial, sans-serif`;
      ctx.fillText("TIKITOKI", 0, 0);
      ctx.restore();
      sparkles(ctx, w, h, 50, "#b7a2ff");
      brand(ctx, w, h);
    },
  },
];

function Preview({ draw }: { draw: DrawFn }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) draw(ctx, c.width, c.height);
  }, [draw]);
  return <canvas ref={ref} width={150} height={325} className="h-full w-full" />;
}

function download(draw: DrawFn, name: string) {
  const c = document.createElement("canvas");
  c.width = 1170;
  c.height = 2532;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  draw(ctx, c.width, c.height);
  c.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `fondo-tikitoki-${name.toLowerCase()}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, "image/png");
}

export function Wallpapers() {
  return (
    <div>
      <p className="mb-6 text-center text-sm text-niebla">
        Fondos de móvil holográficos, gratis. Descarga el que más te mole 💜
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {DESIGNS.map((d) => (
          <div key={d.name} className="flex flex-col gap-2">
            <div className="overflow-hidden rounded-2xl border border-white/12">
              <Preview draw={d.draw} />
            </div>
            <button
              onClick={() => download(d.draw, d.name)}
              data-cursor
              className="rounded-full border border-white/15 py-2 text-xs font-medium transition-colors hover:border-[rgba(183,162,255,0.6)] hover:text-crema"
            >
              Descargar ↓
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
