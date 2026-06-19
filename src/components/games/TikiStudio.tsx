"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Pose = "baila" | "saluda" | "loco" | "amor";

const BGS = [
  ["#2a1b5e", "#0d2c4d"],
  ["#5e2b4d", "#2a1b5e"],
  ["#1b4d52", "#0d2c4d"],
  ["#5e3a1b", "#5e2b4d"],
];

const W = 405;
const H = 720;

export function TikiStudio({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);
  const heartsRef = useRef<{ x: number; y: number; vy: number; life: number }[]>([]);

  const [camOn, setCamOn] = useState(false);
  const [pose, setPose] = useState<Pose>("baila");
  const [bg, setBg] = useState(0);
  const [caption, setCaption] = useState("cuando llega mi pedido de La TikiToki");
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const poseRef = useRef(pose);
  const bgRef = useRef(bg);
  const capRef = useRef(caption);
  poseRef.current = pose;
  bgRef.current = bg;
  capRef.current = caption;

  /* --------------------------- dibujar Tiki --------------------------- */
  const drawTiki = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number, r: number) => {
      const p = poseRef.current;
      const bob = Math.sin(t * 3) * r * 0.06;
      const sway = Math.sin(t * 2) * r * (p === "loco" ? 0.18 : 0.1);
      const rot = p === "loco" ? t * 5 : Math.sin(t * 2.5) * 0.16;
      const pulse = p === "loco" ? 1 + Math.sin(t * 9) * 0.06 : 1;

      ctx.save();
      ctx.translate(cx + sway, cy + bob);
      ctx.rotate(rot);
      ctx.scale(pulse, pulse);

      // antena estrella
      ctx.fillStyle = "#fff3c4";
      star(ctx, 0, -r - 18, 5, 11, 5);
      ctx.strokeStyle = "#c8b8ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -r - 6);
      ctx.lineTo(0, -r + 6);
      ctx.stroke();

      // cuerpo
      const grad = ctx.createLinearGradient(-r, -r, r, r);
      grad.addColorStop(0, "#c8b8ff");
      grad.addColorStop(0.5, "#9fe9ff");
      grad.addColorStop(1, "#ffb4e2");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // brillo
      const gl = ctx.createRadialGradient(-r * 0.3, -r * 0.35, 2, -r * 0.3, -r * 0.35, r);
      gl.addColorStop(0, "rgba(255,255,255,0.8)");
      gl.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gl;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // mejillas
      ctx.fillStyle = "rgba(255,143,208,0.55)";
      ellipse(ctx, -r * 0.5, r * 0.32, r * 0.18, r * 0.12);
      ellipse(ctx, r * 0.5, r * 0.32, r * 0.18, r * 0.12);

      // ojos + boca
      ctx.fillStyle = "#1a0f33";
      const ex = r * 0.42;
      const ey = -r * 0.05;
      if (p === "loco") {
        // ojos espiral simples (x)
        ctx.strokeStyle = "#1a0f33";
        ctx.lineWidth = 4;
        cross(ctx, -ex, ey, 9);
        cross(ctx, ex, ey, 9);
      } else if (p === "amor") {
        heart(ctx, -ex, ey, r * 0.16);
        heart(ctx, ex, ey, r * 0.16);
      } else {
        ellipse(ctx, -ex, ey, r * 0.16, r * 0.2);
        ellipse(ctx, ex, ey, r * 0.16, r * 0.2);
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(-ex + 4, ey - 5, 4, 0, Math.PI * 2);
        ctx.arc(ex + 4, ey - 5, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1a0f33";
      }
      // boca
      ctx.strokeStyle = "#1a0f33";
      ctx.lineWidth = 5;
      ctx.beginPath();
      const open = p === "loco" ? 0.6 : 0.4;
      ctx.arc(0, r * 0.32, r * 0.28, 0.15 * Math.PI, (1 - 0.15) * Math.PI);
      ctx.stroke();
      void open;

      // brazo que saluda
      if (p === "saluda") {
        ctx.fillStyle = grad;
        ctx.save();
        ctx.translate(r * 0.92, -r * 0.1);
        ctx.rotate(Math.sin(t * 10) * 0.5 - 0.3);
        ellipse(ctx, 0, -r * 0.3, r * 0.16, r * 0.34);
        ctx.restore();
      }

      ctx.restore();

      // corazones (amor)
      if (p === "amor" && Math.random() > 0.6) {
        heartsRef.current.push({
          x: cx + (Math.random() - 0.5) * r,
          y: cy - r,
          vy: 1 + Math.random() * 1.5,
          life: 1,
        });
      }
      heartsRef.current = heartsRef.current.filter((h) => h.life > 0);
      heartsRef.current.forEach((h) => {
        h.y -= h.vy;
        h.life -= 0.012;
        ctx.globalAlpha = Math.max(0, h.life);
        ctx.fillStyle = "#ff5fa8";
        heart(ctx, h.x, h.y, 10);
        ctx.globalAlpha = 1;
      });
    },
    [],
  );

  /* --------------------------- bucle de render --------------------------- */
  const render = useCallback(
    (t: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const time = t / 1000;
      ctx.clearRect(0, 0, W, H);

      // fondo: vídeo o gradiente
      const video = videoRef.current;
      if (camOn && video && video.readyState >= 2) {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        const scale = Math.max(W / vw, H / vh);
        const dw = vw * scale;
        const dh = vh * scale;
        ctx.save();
        ctx.translate(W, 0);
        ctx.scale(-1, 1); // espejo selfie
        ctx.drawImage(video, (W - dw) / 2, (H - dh) / 2, dw, dh);
        ctx.restore();
        ctx.fillStyle = "rgba(7,4,17,0.25)";
        ctx.fillRect(0, 0, W, H);
      } else {
        const [c1, c2] = BGS[bgRef.current];
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        // destellos
        for (let i = 0; i < 24; i++) {
          const sx = (Math.sin(i * 12.9 + time) * 0.5 + 0.5) * W;
          const sy = ((i * 53) % H) + Math.sin(time + i) * 8;
          ctx.globalAlpha = 0.5 + Math.sin(time * 2 + i) * 0.4;
          ctx.fillStyle = "#cdbcff";
          ctx.fillRect(sx, sy, 2, 2);
        }
        ctx.globalAlpha = 1;
      }

      // Tiki
      drawTiki(ctx, time, W / 2, H * 0.52, 78);

      // marco holográfico
      ctx.strokeStyle = "rgba(183,162,255,0.9)";
      ctx.lineWidth = 6;
      roundRect(ctx, 8, 8, W - 16, H - 16, 26);
      ctx.stroke();

      // caption
      const cap = capRef.current;
      if (cap) {
        ctx.font = "700 24px Geist, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(7,4,17,0.55)";
        wrapText(ctx, cap, W / 2, 70, W - 70, 30, true);
        ctx.fillStyle = "#ffffff";
        wrapText(ctx, cap, W / 2, 70, W - 70, 30, false);
      }

      // marca
      ctx.font = "800 26px Bricolage Grotesque, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("LA TIKITOKI", W / 2, H - 52);
      ctx.font = "600 13px Geist Mono, monospace";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText("@latikitoki", W / 2, H - 32);

      rafRef.current = requestAnimationFrame(render);
    },
    [camOn, drawTiki],
  );

  useEffect(() => {
    if (!open) return;
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [open, render]);

  /* ------------------------------- cámara ------------------------------- */
  const toggleCam = async () => {
    if (camOn) {
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
      setCamOn(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 720, height: 1280 },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamOn(true);
    } catch {
      alert(
        "No hemos podido acceder a la cámara. Puedes seguir creando con un fondo holográfico 💜",
      );
    }
  };

  /* ------------------------------ grabar -------------------------------- */
  const startRec = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stream = canvas.captureStream(30);
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const rec = new MediaRecorder(stream, { mimeType: mime });
    chunksRef.current = [];
    rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    };
    recRef.current = rec;
    rec.start();
    setRecording(true);
    setElapsed(0);
  };

  const stopRec = useCallback(() => {
    recRef.current?.state === "recording" && recRef.current.stop();
    setRecording(false);
  }, []);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= 12) {
          stopRec();
          return 12;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [recording, stopRec]);

  const snapshot = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "tiki-latikitoki.png";
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  };

  // limpieza al cerrar
  const close = useCallback(() => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    setCamOn(false);
    stopRec();
    onClose();
  }, [onClose, stopRec]);

  useEffect(() => {
    if (!open) {
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    }
  }, [open]);

  const POSES: { key: Pose; label: string }[] = [
    { key: "baila", label: "Baila 🕺" },
    { key: "saluda", label: "Saluda 👋" },
    { key: "loco", label: "Modo loco 🤪" },
    { key: "amor", label: "Enamorado 😍" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[350] flex items-center justify-center p-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-noche/85 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            className="glass-strong relative z-10 grid max-h-[94vh] w-full max-w-3xl gap-5 overflow-y-auto rounded-[1.8rem] border border-white/12 p-5 md:grid-cols-[auto_1fr]"
          >
            <button
              onClick={close}
              data-cursor
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-noche/50 text-niebla hover:text-crema"
            >
              ✕
            </button>

            {/* Lienzo */}
            <div className="mx-auto">
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                className="h-[58vh] w-auto rounded-2xl border border-white/10 bg-noche"
              />
              <video ref={videoRef} className="hidden" playsInline muted />
              {recording && (
                <p className="mt-2 text-center font-mono text-xs text-rosa">
                  ● GRABANDO {elapsed}s / 12s
                </p>
              )}
            </div>

            {/* Controles */}
            <div className="flex flex-col">
              <p className="font-mono text-[0.65rem] tracking-[0.25em] text-lila">
                / TIKI STUDIO
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold">
                Hazte viral con Tiki
              </h3>
              <p className="mt-1 text-sm text-niebla">
                Pon a Tiki a hacer el tonto, grábalo y súbelo a tu TikTok. La
                tendencia la pones tú.
              </p>

              <label className="mt-4 text-xs text-niebla">Tu frase</label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={60}
                className="mt-1 rounded-xl border border-white/15 bg-noche/40 px-3 py-2 text-sm outline-none focus:border-[rgba(183,162,255,0.6)]"
              />

              <p className="mt-4 text-xs text-niebla">Qué hace Tiki</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {POSES.map((po) => (
                  <button
                    key={po.key}
                    onClick={() => setPose(po.key)}
                    data-cursor
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      pose === po.key
                        ? "text-noche"
                        : "border border-white/15 text-niebla hover:text-crema"
                    }`}
                    style={pose === po.key ? { background: "var(--holo)" } : undefined}
                  >
                    {po.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button onClick={toggleCam} data-cursor className="btn-ghost text-sm">
                  {camOn ? "Quitar cámara" : "Activar cámara 📷"}
                </button>
                {!camOn && (
                  <div className="flex gap-1.5">
                    {BGS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setBg(i)}
                        aria-label={`Fondo ${i + 1}`}
                        data-cursor
                        className={`h-7 w-7 rounded-full border transition-transform ${
                          bg === i ? "scale-110 border-crema" : "border-white/20"
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${BGS[i][0]}, ${BGS[i][1]})`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-3">
                  {!recording ? (
                    <button onClick={startRec} data-cursor className="btn-holo">
                      ● Grabar clip
                    </button>
                  ) : (
                    <button onClick={stopRec} data-cursor className="btn-ghost">
                      ■ Parar
                    </button>
                  )}
                  <button onClick={snapshot} data-cursor className="btn-ghost">
                    Foto 📸
                  </button>
                </div>

                {videoUrl && (
                  <div className="mt-4 rounded-2xl border border-white/12 bg-white/5 p-3">
                    <video
                      src={videoUrl}
                      controls
                      loop
                      className="mx-auto max-h-40 rounded-lg"
                    />
                    <a
                      href={videoUrl}
                      download="tiki-latikitoki.webm"
                      data-cursor
                      className="btn-holo mt-3 w-full justify-center text-sm"
                    >
                      Descargar vídeo ↓
                    </a>
                    <p className="mt-2 text-center text-[11px] text-niebla">
                      Súbelo a TikTok y añade tu sonido favorito 🎵
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- helpers canvas ---------------------------- */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function ellipse(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}
function star(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  inner: number,
  outer: number,
  points: number,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / points - Math.PI / 2;
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fill();
}
function heart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s, y - s * 0.2, x - s, y + s * 0.3);
  ctx.bezierCurveTo(x - s, y + s, x, y + s * 1.2, x, y + s * 1.5);
  ctx.bezierCurveTo(x, y + s * 1.2, x + s, y + s, x + s, y + s * 0.3);
  ctx.bezierCurveTo(x + s, y - s * 0.2, x, y, x, y + s * 0.3);
  ctx.fill();
}
function cross(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(x - s, y - s);
  ctx.lineTo(x + s, y + s);
  ctx.moveTo(x + s, y - s);
  ctx.lineTo(x - s, y + s);
  ctx.stroke();
}
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh: number,
  stroke: boolean,
) {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w + " ";
    } else line = test;
  }
  lines.push(line);
  lines.forEach((l, i) => {
    if (stroke) {
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(7,4,17,0.55)";
      ctx.strokeText(l.trim(), x, y + i * lh);
    } else {
      ctx.fillText(l.trim(), x, y + i * lh);
    }
  });
}
