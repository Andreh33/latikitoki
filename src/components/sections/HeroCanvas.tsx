"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ===========================================================================
   Render del hero — aurora holográfica de marca + GOTA DE CROMO LÍQUIDO
   iridiscente (material firma de La TikiToki) que ondula y refleja la aurora.
   =========================================================================== */

const auroraVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  vec2 hash(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
          dot(hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
      mix(dot(hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
          dot(hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime * 0.05;
    vec2 p = uv * 2.6;
    float n  = fbm(p + vec2(t, -t * 0.6)) + 0.5;
    float n2 = fbm(p * 1.7 - vec2(t * 0.45, t)) + 0.5;
    float n3 = fbm(p * 0.9 + vec2(-t * 0.3, t * 0.5)) + 0.5;

    vec3 lila = vec3(0.74, 0.60, 1.0);
    vec3 azul = vec3(0.36, 0.86, 1.0);
    vec3 rosa = vec3(1.0, 0.52, 0.84);
    vec3 violeta = vec3(0.42, 0.24, 0.95);
    vec3 base = vec3(0.027, 0.014, 0.07);

    vec3 col = base;
    col = mix(col, violeta, smoothstep(0.38, 0.82, n3) * 0.8);
    col = mix(col, lila, smoothstep(0.46, 0.96, n) * 0.95);
    col = mix(col, azul, smoothstep(0.55, 1.02, n2) * 0.8);
    col = mix(col, rosa, smoothstep(0.62, 1.08, n * n2) * 0.55);

    col *= 0.92;
    float d = distance(uv, vec2(0.5));
    col *= smoothstep(1.25, 0.12, d);
    col += lila * 0.05 * (1.0 - d);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Aurora() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta;
  });
  return (
    <mesh position={[0, 0, -6]}>
      <planeGeometry args={[46, 30, 1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={auroraVertex}
        fragmentShader={auroraFragment}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ----------------------------- Liquid chrome ----------------------------- */

function LiquidChrome({ lite }: { lite: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.18;
      mesh.current.rotation.x += delta * 0.06;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={1}>
      <mesh ref={mesh} scale={lite ? 1.85 : 2.05}>
        <sphereGeometry args={[1, lite ? 96 : 160, lite ? 96 : 160]} />
        <MeshDistortMaterial
          color="#f0e9ff"
          metalness={1}
          roughness={0.11}
          envMapIntensity={2.2}
          distort={lite ? 0.3 : 0.4}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

function Droplets({ lite }: { lite: boolean }) {
  const data = useMemo(
    () => [
      { r: 3.4, y: 1.4, s: 0.3, speed: 0.45, phase: 0 },
      { r: 3.7, y: -1.5, s: 0.22, speed: -0.38, phase: 2.1 },
      { r: 3.2, y: -0.4, s: 0.18, speed: 0.6, phase: 4.2 },
    ],
    [],
  );
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      const m = refs.current[i];
      if (!m) return;
      const a = t * d.speed + d.phase;
      m.position.set(
        Math.cos(a) * d.r,
        d.y + Math.sin(t * 0.7 + i) * 0.3,
        Math.sin(a) * d.r * 0.5 - 1,
      );
    });
  });
  if (lite) return null;
  return (
    <group>
      {data.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          scale={d.s}
        >
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#e3d9ff"
            metalness={1}
            roughness={0.22}
            envMapIntensity={1.8}
            distort={0.55}
            speed={2.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ lite }: { lite: boolean }) {
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 8);

  return (
    <>
      <Aurora />
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={22} color="#b7a2ff" />
      <pointLight position={[-6, -3, 2]} intensity={16} color="#82e6ff" />
      <pointLight position={[0, -5, 4]} intensity={12} color="#ff97d6" />

      <group scale={scale}>
        <LiquidChrome lite={lite} />
        <Droplets lite={lite} />
      </group>

      <Sparkles
        count={lite ? 70 : 130}
        scale={[15, 9, 6]}
        size={3}
        speed={0.3}
        opacity={0.8}
        color="#e6dcff"
      />

      {/* Entorno holográfico: lo que refleja el cromo */}
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <color attach="background" args={["#43317f"]} />
        <Lightformer intensity={4} position={[3, 3, 2]} scale={[8, 8, 1]} color="#b7a2ff" />
        <Lightformer intensity={3.6} position={[-4, -1, 1]} scale={[8, 8, 1]} color="#82e6ff" />
        <Lightformer intensity={3} position={[0, -3, -2]} scale={[9, 5, 1]} color="#ff97d6" />
        {/* franjas blancas tipo estudio → reflejos nítidos en el cromo */}
        <Lightformer intensity={6} position={[-2.5, 3, 1]} scale={[0.6, 9, 1]} color="#ffffff" />
        <Lightformer intensity={5} position={[3, -2.5, 1.5]} scale={[9, 0.6, 1]} color="#ffffff" />
        <Lightformer intensity={4} position={[2.5, 2.5, 2]} scale={[0.5, 6, 1]} color="#dceaff" />
        <Lightformer intensity={2.4} form="ring" position={[1.5, 1, 3]} scale={[3.5, 3.5, 1]} color="#cdbcff" />
      </Environment>

      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={lite ? 0.65 : 0.8}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.25}
        />
      </EffectComposer>
    </>
  );
}

export default function HeroCanvas({ lite = false }: { lite?: boolean }) {
  return (
    <Canvas
      className="!pointer-events-none"
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={lite ? [1, 2] : [1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene lite={lite} />
    </Canvas>
  );
}
