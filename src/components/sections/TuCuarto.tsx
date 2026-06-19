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

function Wood(props: { color?: string; rough?: number }) {
  return <meshStandardMaterial color={props.color ?? "#c89a6a"} roughness={props.rough ?? 0.65} />;
}

function Room({ active }: { active: Set<string> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current)
      group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.22) * 0.32;
  });

  const proyOn = active.has("proyector-galaxia-aurora");
  const ledOn = active.has("tira-led-reactiva");
  const lunaOn = active.has("lampara-luna-levitante");
  const sunsetOn = active.has("lampara-sunset");
  const espejoOn = active.has("espejo-hollywood");
  const pixelOn = active.has("pixel-clock");

  // La sala SIEMPRE se ve; el proyector solo la atenúa un poco.
  const ambient = proyOn ? 0.42 : 0.62;

  return (
    <>
      <ambientLight intensity={ambient} color="#fff0e4" />
      <hemisphereLight args={["#b7a2ff", "#2a1d5c", 0.55]} />
      {/* luz de ventana (fría) + luz cálida ambiente */}
      <pointLight position={[1.5, 3, -3]} intensity={7} color="#bcd4ff" distance={13} />
      <pointLight position={[3.5, 3.2, 3.5]} intensity={5} color="#ffd9b0" distance={14} />
      <directionalLight position={[4, 6, 4]} intensity={0.5} color="#fff" />

      <group ref={group} position={[0, -0.2, 0]}>
        {/* suelo */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="#473a6e" roughness={0.85} />
        </mesh>
        {/* alfombra */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.02, 0.9]}>
          <circleGeometry args={[1.7, 48]} />
          <meshStandardMaterial color="#6a58b0" roughness={1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.03, 0.9]}>
          <ringGeometry args={[1.3, 1.5, 48]} />
          <meshStandardMaterial color="#8a78d8" roughness={1} />
        </mesh>
        {/* paredes (claras para que se vea la sala) */}
        <mesh position={[0, 2, -3.6]}>
          <planeGeometry args={[8, 4.4]} />
          <meshStandardMaterial color="#5a4a8e" roughness={1} />
        </mesh>
        <mesh position={[-3.6, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[8, 4.4]} />
          <meshStandardMaterial color="#4e3f80" roughness={1} />
        </mesh>

        {/* ventana con cielo de noche */}
        <group position={[1.6, 2.4, -3.55]}>
          <mesh>
            <planeGeometry args={[2, 2.2]} />
            <meshStandardMaterial color="#16204a" emissive="#22305f" emissiveIntensity={0.6} />
          </mesh>
          {Array.from({ length: 14 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.sin(i * 33.3) * 0.5) * 1.7,
                (Math.cos(i * 17.7) * 0.5) * 1.9,
                0.02,
              ]}
            >
              <circleGeometry args={[0.018, 8]} />
              <meshBasicMaterial color="#fff" toneMapped={false} />
            </mesh>
          ))}
          {/* marco */}
          <mesh position={[0, 0, 0.03]}>
            <ringGeometry args={[0, 0, 4]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[0.06, 2.3, 0.06]} />
            <Wood color="#efe7ff" rough={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[2.1, 0.06, 0.06]} />
            <Wood color="#efe7ff" rough={0.4} />
          </mesh>
        </group>

        {/* estante con libros */}
        <group position={[-2.3, 2.7, -3.5]}>
          <RoundedBox args={[1.5, 0.08, 0.32]} radius={0.02}>
            <Wood />
          </RoundedBox>
          {["#ff8fd0", "#82e6ff", "#b7a2ff", "#ffe15c", "#7a5cff"].map((c, i) => (
            <RoundedBox
              key={i}
              args={[0.12, 0.4, 0.26]}
              radius={0.01}
              position={[-0.5 + i * 0.18, 0.24, 0]}
              rotation={[0, 0, i === 4 ? 0.4 : 0]}
            >
              <meshStandardMaterial color={c} roughness={0.6} />
            </RoundedBox>
          ))}
        </group>

        {/* cama */}
        <group position={[-1.95, 0, -2.05]}>
          <RoundedBox args={[2.4, 0.4, 2.9]} radius={0.06} position={[0, 0.22, 0]}>
            <meshStandardMaterial color="#3a2d6b" roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[2.3, 0.36, 2.8]} radius={0.14} position={[0, 0.52, 0.05]}>
            <meshStandardMaterial color="#cabfff" roughness={0.85} />
          </RoundedBox>
          <RoundedBox args={[2.3, 0.16, 1.3]} radius={0.12} position={[0, 0.7, 0.74]}>
            <meshStandardMaterial color="#a78bff" roughness={0.8} />
          </RoundedBox>
          <RoundedBox args={[2.4, 1.15, 0.2]} radius={0.08} position={[0, 0.8, -1.45]}>
            <meshStandardMaterial color="#4a3a8f" roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[0.95, 0.32, 0.6]} radius={0.15} position={[-0.55, 0.82, -0.95]} rotation={[0, 0, 0.06]}>
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[0.95, 0.32, 0.6]} radius={0.15} position={[0.55, 0.82, -0.95]} rotation={[0, 0, -0.05]}>
            <meshStandardMaterial color="#ffd9ec" roughness={0.7} />
          </RoundedBox>
        </group>

        {/* mesita */}
        <group position={[-0.2, 0, -2.7]}>
          <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.05} position={[0, 0.35, 0]}>
            <Wood color="#b08a64" />
          </RoundedBox>
          {lunaOn && (
            <group position={[0, 0.95, 0]}>
              <mesh>
                <sphereGeometry args={[0.26, 32, 32]} />
                <meshStandardMaterial color="#fff1d0" emissive="#ffe7b0" emissiveIntensity={1.8} roughness={0.6} />
              </mesh>
              <pointLight color="#ffe2a8" intensity={6} distance={5} />
            </group>
          )}
        </group>

        {/* escritorio */}
        <group position={[2.1, 0, -2.5]}>
          <RoundedBox args={[2.1, 0.1, 0.95]} radius={0.03} position={[0, 1.12, 0]}>
            <Wood />
          </RoundedBox>
          <mesh position={[-0.9, 0.56, -0.35]}>
            <cylinderGeometry args={[0.04, 0.04, 1.12, 8]} />
            <meshStandardMaterial color="#2a1d4a" />
          </mesh>
          <mesh position={[0.9, 0.56, -0.35]}>
            <cylinderGeometry args={[0.04, 0.04, 1.12, 8]} />
            <meshStandardMaterial color="#2a1d4a" />
          </mesh>
          {/* monitor */}
          <group position={[-0.3, 1.55, -0.28]}>
            <RoundedBox args={[1, 0.6, 0.06]} radius={0.03}>
              <meshStandardMaterial color="#14102c" />
            </RoundedBox>
            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[0.9, 0.5]} />
              <meshBasicMaterial color={pixelOn ? "#ff5fb0" : "#5b7cff"} toneMapped={false} />
            </mesh>
            <mesh position={[0, -0.42, 0]}>
              <cylinderGeometry args={[0.05, 0.08, 0.32, 10]} />
              <meshStandardMaterial color="#2a2342" />
            </mesh>
          </group>
          {/* planta */}
          <group position={[0.75, 1.22, -0.25]}>
            <mesh>
              <cylinderGeometry args={[0.13, 0.1, 0.22, 14]} />
              <meshStandardMaterial color="#c98a6a" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#5fa86a" roughness={0.8} />
            </mesh>
            <mesh position={[0.1, 0.32, 0.05]}>
              <sphereGeometry args={[0.13, 12, 12]} />
              <meshStandardMaterial color="#6fc07a" roughness={0.8} />
            </mesh>
          </group>
          {/* base del proyector */}
          <RoundedBox args={[0.4, 0.18, 0.4]} radius={0.06} position={[0.4, 1.26, 0.2]}>
            <meshStandardMaterial color="#15112a" metalness={0.3} roughness={0.4} />
          </RoundedBox>
          {proyOn && (
            <mesh position={[0.4, 1.4, 0.2]}>
              <sphereGeometry args={[0.1, 20, 20]} />
              <meshBasicMaterial color="#7fe3ff" toneMapped={false} />
            </mesh>
          )}
          {/* silla */}
          <group position={[-0.3, 0, 0.75]}>
            <RoundedBox args={[0.6, 0.1, 0.6]} radius={0.05} position={[0, 0.62, 0]}>
              <meshStandardMaterial color="#7a5cff" roughness={0.6} />
            </RoundedBox>
            <RoundedBox args={[0.6, 0.65, 0.1]} radius={0.05} position={[0, 0.95, -0.27]}>
              <meshStandardMaterial color="#7a5cff" roughness={0.6} />
            </RoundedBox>
          </group>
        </group>

        {/* ===== EFECTOS DE PRODUCTO (capas de luz sobre la sala visible) ===== */}

        {proyOn && (
          <>
            <Sparkles count={260} scale={[7.5, 4.5, 7.5]} position={[0, 2.6, -0.5]} size={4} speed={0.4} opacity={0.9} color="#cdbcff" />
            <pointLight position={[0.4, 3, 0.2]} color="#9b7bff" intensity={4} distance={11} />
          </>
        )}

        {ledOn && (
          <>
            {/* tira suave en la unión pared-techo */}
            <mesh position={[0, 4.0, -3.55]}>
              <boxGeometry args={[7, 0.05, 0.05]} />
              <meshBasicMaterial color="#b7a2ff" toneMapped={false} />
            </mesh>
            <mesh position={[-3.55, 4.0, 0]}>
              <boxGeometry args={[0.05, 0.05, 7]} />
              <meshBasicMaterial color="#82e6ff" toneMapped={false} />
            </mesh>
            {/* underglow bajo la cama */}
            <mesh position={[-1.95, 0.05, -2.05]}>
              <boxGeometry args={[2.5, 0.04, 3]} />
              <meshBasicMaterial color="#ff7ec8" toneMapped={false} />
            </mesh>
            <pointLight position={[-1.5, 2.6, -1.5]} color="#b7a2ff" intensity={3} distance={9} />
            <pointLight position={[1.5, 1, 1]} color="#82e6ff" intensity={2.4} distance={9} />
          </>
        )}

        {sunsetOn && (
          <>
            <mesh position={[-2.6, 2.3, -3.54]}>
              <circleGeometry args={[0.85, 40]} />
              <meshBasicMaterial color="#ff8a3c" toneMapped={false} />
            </mesh>
            <pointLight position={[-2.4, 2.2, -2.6]} color="#ff7a3c" intensity={6} distance={7} />
          </>
        )}

        {espejoOn && (
          <group position={[3.5, 2.1, -1]} rotation={[0, -Math.PI / 2, 0]}>
            <RoundedBox args={[1.2, 1.5, 0.08]} radius={0.05}>
              <meshStandardMaterial color="#0d0820" metalness={0.7} roughness={0.15} />
            </RoundedBox>
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return (
                <mesh key={i} position={[Math.cos(a) * 0.7, Math.sin(a) * 0.85, 0.06]}>
                  <sphereGeometry args={[0.05, 12, 12]} />
                  <meshBasicMaterial color="#fff4d6" toneMapped={false} />
                </mesh>
              );
            })}
            <pointLight color="#fff0cc" intensity={3.5} distance={5} position={[0, 0, 0.6]} />
          </group>
        )}
      </group>

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.7} luminanceThreshold={0.55} luminanceSmoothing={0.3} />
      </EffectComposer>
    </>
  );
}

/* ------------------------------- componente ------------------------------ */

export function TuCuarto() {
  const [active, setActive] = useState<Set<string>>(
    () => new Set(["tira-led-reactiva", "lampara-luna-levitante"]),
  );
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { add } = useCart();

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
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const total = ROOM_PRODUCTS.filter((p) => active.has(p.id)).reduce(
    (s, p) => s + p.price,
    0,
  );

  const montar = () =>
    ROOM_PRODUCTS.filter((p) => active.has(p.id)).forEach((p) => add(p));

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
            Enciende los productos y mira cómo transforman la habitación. Cuando
            te guste, te lo llevas entero. Esto no lo tiene nadie.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#1a1340] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
          {mounted ? (
            <Canvas
              ref={canvasRef}
              camera={{ position: [5.2, 3.6, 5.6], fov: 38 }}
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
            ENCIENDE PRODUCTOS Y MIRA LA MAGIA →
          </p>
        </div>

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
                    on ? "border-transparent" : "border-white/12 hover:border-white/30"
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
                    <span className="block truncate text-sm font-semibold">{p.name}</span>
                    <span className="font-mono text-xs text-niebla">{euro(p.price)}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="glass mt-5 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-niebla">Tu cuarto ({active.size})</span>
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
