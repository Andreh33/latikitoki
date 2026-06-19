"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Reveal } from "@/components/text/Reveal";
import { useCart } from "@/components/providers/CartProvider";
import { PRODUCTS, type Product } from "@/lib/products";
import { euro } from "@/lib/utils";

const ROOM_IDS = [
  "proyector-galaxia-aurora",
  "tira-led-reactiva",
  "lampara-luna-levitante",
  "lampara-sunset",
  "espejo-hollywood",
  "pixel-clock",
] as const;

const ROOM_PRODUCTS = ROOM_IDS.map(
  (id) => PRODUCTS.find((p) => p.id === id)!,
).filter(Boolean) as Product[];

/* ------------------------------- escena 3D ------------------------------- */

function Glow({
  position,
  color,
  intensity = 6,
  size = 0.22,
}: {
  position: [number, number, number];
  color: string;
  intensity?: number;
  size?: number;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 24, 24]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <pointLight color={color} intensity={intensity} distance={7} />
    </group>
  );
}

function Room({ active }: { active: Set<string> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.12;
  });
  const lights = active.size;
  const ambient = Math.max(0.12, 0.5 - lights * 0.07);

  const ledOn = active.has("tira-led-reactiva");
  const proyOn = active.has("proyector-galaxia-aurora");
  const lunaOn = active.has("lampara-luna-levitante");
  const sunsetOn = active.has("lampara-sunset");
  const espejoOn = active.has("espejo-hollywood");
  const pixelOn = active.has("pixel-clock");

  return (
    <>
      <ambientLight intensity={ambient} />
      <hemisphereLight args={["#3a2a78", "#0d0820", 0.4]} />

      <group ref={group}>
        {/* suelo */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[7, 7]} />
          <meshStandardMaterial color="#171034" roughness={0.9} />
        </mesh>
        {/* alfombra */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.4, 0.01, 0.6]}>
          <circleGeometry args={[1.5, 40]} />
          <meshStandardMaterial color="#2a1d5c" roughness={1} />
        </mesh>
        {/* paredes */}
        <mesh position={[0, 1.8, -3.4]}>
          <planeGeometry args={[7, 3.8]} />
          <meshStandardMaterial color="#221848" roughness={1} />
        </mesh>
        <mesh position={[-3.4, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[7, 3.8]} />
          <meshStandardMaterial color="#1d1540" roughness={1} />
        </mesh>

        {/* cama */}
        <group position={[-1.7, 0, -2]}>
          <RoundedBox args={[2.2, 0.55, 2.6]} radius={0.08} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#2e2160" roughness={0.8} />
          </RoundedBox>
          <RoundedBox args={[2.2, 0.18, 2.6]} radius={0.08} position={[0, 0.62, 0]}>
            <meshStandardMaterial color="#4a3a8f" roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[0.9, 0.28, 0.55]} radius={0.1} position={[0, 0.78, -0.9]}>
            <meshStandardMaterial color="#c9bcff" roughness={0.6} />
          </RoundedBox>
        </group>

        {/* escritorio */}
        <group position={[1.9, 0, -2.2]}>
          <RoundedBox args={[1.9, 0.1, 0.85]} radius={0.03} position={[0, 1.05, 0]}>
            <meshStandardMaterial color="#3a2c70" roughness={0.6} />
          </RoundedBox>
          <mesh position={[-0.8, 0.52, -0.3]}>
            <cylinderGeometry args={[0.04, 0.04, 1.05, 8]} />
            <meshStandardMaterial color="#241a4a" />
          </mesh>
          <mesh position={[0.8, 0.52, -0.3]}>
            <cylinderGeometry args={[0.04, 0.04, 1.05, 8]} />
            <meshStandardMaterial color="#241a4a" />
          </mesh>
        </group>

        {/* ===== PRODUCTOS ===== */}

        {/* Proyector galaxia: lluvia de estrellas + luz cenital */}
        {proyOn && (
          <>
            <Sparkles
              count={300}
              scale={[7, 4.5, 7]}
              position={[0, 2.2, 0]}
              size={4}
              speed={0.4}
              opacity={0.95}
              color="#cdbcff"
            />
            <pointLight position={[0, 3, 0]} color="#9b7bff" intensity={5} distance={11} />
          </>
        )}
        {/* base del proyector en el escritorio */}
        <RoundedBox args={[0.4, 0.18, 0.4]} radius={0.06} position={[1.6, 1.2, -2.2]}>
          <meshStandardMaterial color="#141026" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        {proyOn && <Glow position={[1.6, 1.36, -2.2]} color="#7fe3ff" intensity={3} size={0.12} />}

        {/* Tira LED: franjas emisivas en aristas de pared */}
        {ledOn && (
          <>
            <mesh position={[0, 3.5, -3.38]}>
              <boxGeometry args={[6.6, 0.06, 0.06]} />
              <meshBasicMaterial color="#b7a2ff" toneMapped={false} />
            </mesh>
            <mesh position={[-3.38, 3.5, 0]}>
              <boxGeometry args={[0.06, 0.06, 6.6]} />
              <meshBasicMaterial color="#82e6ff" toneMapped={false} />
            </mesh>
            <mesh position={[-3.38, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[3.4, 0.06, 0.06]} />
              <meshBasicMaterial color="#ff97d6" toneMapped={false} />
            </mesh>
            <pointLight position={[-2, 2.5, -2]} color="#b7a2ff" intensity={4} distance={9} />
            <pointLight position={[2, 1.5, 1]} color="#82e6ff" intensity={3} distance={9} />
          </>
        )}

        {/* Lámpara luna: esfera flotante */}
        {lunaOn && (
          <group position={[-2.6, 1.9, -1.4]}>
            <mesh>
              <sphereGeometry args={[0.32, 32, 32]} />
              <meshStandardMaterial
                color="#fff1d0"
                emissive="#ffe7b0"
                emissiveIntensity={1.6}
                roughness={0.7}
              />
            </mesh>
            <pointLight color="#ffe2a8" intensity={4} distance={6} />
          </group>
        )}

        {/* Sunset lamp: halo naranja en la pared */}
        {sunsetOn && (
          <>
            <mesh position={[2.3, 2, -3.35]}>
              <circleGeometry args={[0.7, 40]} />
              <meshBasicMaterial color="#ff8a3c" toneMapped={false} />
            </mesh>
            <pointLight position={[2.3, 2, -2.8]} color="#ff7a3c" intensity={5} distance={7} />
          </>
        )}

        {/* Espejo Hollywood: marco con bombillas */}
        {espejoOn && (
          <group position={[2.6, 2, -3.34]}>
            <mesh>
              <planeGeometry args={[1.2, 1.5]} />
              <meshStandardMaterial color="#0d0820" metalness={0.6} roughness={0.2} />
            </mesh>
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return (
                <mesh key={i} position={[Math.cos(a) * 0.75, Math.sin(a) * 0.9, 0.03]}>
                  <sphereGeometry args={[0.06, 12, 12]} />
                  <meshBasicMaterial color="#fff4d6" toneMapped={false} />
                </mesh>
              );
            })}
            <pointLight color="#fff0cc" intensity={3} distance={5} position={[0, 0, 0.5]} />
          </group>
        )}

        {/* Pixel clock: panel emisivo en el escritorio */}
        {pixelOn && (
          <group position={[2.4, 1.32, -2.2]}>
            <RoundedBox args={[0.5, 0.5, 0.1]} radius={0.04}>
              <meshStandardMaterial color="#0d0820" />
            </RoundedBox>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[0.4, 0.4]} />
              <meshBasicMaterial color="#ff5fb0" toneMapped={false} />
            </mesh>
            <pointLight color="#ff7ec8" intensity={2} distance={4} />
          </group>
        )}
      </group>

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.5} luminanceSmoothing={0.3} />
      </EffectComposer>
    </>
  );
}

/* ------------------------------- componente ------------------------------ */

export function TuCuarto() {
  const [active, setActive] = useState<Set<string>>(
    () => new Set(["tira-led-reactiva", "proyector-galaxia-aurora"]),
  );
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { add } = useCart();

  // monta el lienzo solo cuando la sección está cerca (rendimiento)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setMounted(true),
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (id: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const total = ROOM_PRODUCTS.filter((p) => active.has(p.id)).reduce(
    (s, p) => s + p.price,
    0,
  );

  const montar = () => {
    ROOM_PRODUCTS.filter((p) => active.has(p.id)).forEach((p) => add(p));
  };

  const descargar = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "mi-cuarto-tikitoki.png";
    a.click();
  };

  return (
    <section
      ref={sectionRef}
      id="cuarto"
      className="relative mx-auto max-w-[1300px] px-5 py-28 md:px-8"
    >
      <Reveal>
        <div className="mb-10 text-center">
          <p className="eyebrow mb-5">/ Tu Cuarto</p>
          <h2 className="t-h1 font-display font-extrabold">
            Monta tu cuarto <span className="holo-text">soñado</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-niebla">
            Enciende los productos y mira cómo transforman la habitación de
            verdad. Cuando te guste, te lo llevas entero. Esto no lo tiene nadie.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Escena */}
        <div className="relative aspect-square overflow-hidden rounded-[1.8rem] border border-white/10 bg-noche sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
          {mounted ? (
            <Canvas
              ref={canvasRef}
              camera={{ position: [5.2, 4, 5.2], fov: 36 }}
              dpr={[1, 1.8]}
              gl={{ antialias: true, preserveDrawingBuffer: true }}
            >
              <Room active={active} />
            </Canvas>
          ) : (
            <div className="flex h-full items-center justify-center text-niebla">
              Cargando tu cuarto…
            </div>
          )}
          <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.2em] text-niebla/70">
            LA HABITACIÓN GIRA SOLA · ENCIENDE PRODUCTOS →
          </p>
        </div>

        {/* Tray */}
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-3">
            {ROOM_PRODUCTS.map((p) => {
              const on = active.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  data-cursor
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                    on
                      ? "border-transparent"
                      : "border-white/12 hover:border-white/30"
                  }`}
                  style={
                    on
                      ? { background: "rgba(183,162,255,0.14)", borderColor: "rgba(183,162,255,0.5)" }
                      : undefined
                  }
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs ${
                      on ? "text-noche" : "text-niebla"
                    }`}
                    style={on ? { background: "var(--holo)" } : { background: "rgba(255,255,255,0.06)" }}
                  >
                    {on ? "✓" : "+"}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      {p.name}
                    </span>
                    <span className="font-mono text-xs text-niebla">
                      {euro(p.price)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl glass p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-niebla">
                Tu cuarto ({active.size})
              </span>
              <span className="font-display text-2xl font-extrabold holo-text-static">
                {euro(total)}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={montar}
                disabled={active.size === 0}
                data-cursor-label="¡SÍ!"
                className="btn-holo flex-1 justify-center disabled:opacity-40"
              >
                Llevarme el cuarto →
              </button>
              <button onClick={descargar} data-cursor className="btn-ghost">
                Foto 📸
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
