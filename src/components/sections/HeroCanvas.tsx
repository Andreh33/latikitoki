"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Sparkles,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ===========================================================================
   Render del hero — aurora holográfica de marca (lila + azul + rosa), fija.
   Cristal facetado con núcleo que brilla + bloom.
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

    col *= 0.9;
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

/* ------------------------------ Glass crystal ---------------------------- */

function Crystal({ lite }: { lite: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.22;
      mesh.current.rotation.x += delta * 0.08;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.4;
      core.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
      <group scale={lite ? 1.7 : 1.95} rotation={[0.3, 0.4, 0]}>
        {/* núcleo que brilla (lo capta el bloom a través del cristal) */}
        <mesh ref={core} scale={0.42}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#d9c8ff" toneMapped={false} />
        </mesh>

        <mesh ref={mesh}>
          <icosahedronGeometry args={[1, 0]} />
          {lite ? (
            <meshStandardMaterial
              color="#c4b3ff"
              emissive="#7b54ff"
              emissiveIntensity={0.55}
              metalness={0.5}
              roughness={0.15}
              flatShading
            />
          ) : (
            <MeshTransmissionMaterial
              samples={10}
              resolution={512}
              transmission={1}
              thickness={0.9}
              roughness={0.03}
              ior={1.45}
              chromaticAberration={1}
              anisotropy={0.35}
              distortion={0.2}
              distortionScale={0.3}
              temporalDistortion={0.08}
              color="#ffffff"
              attenuationColor="#cdb8ff"
              attenuationDistance={4}
            />
          )}
        </mesh>
      </group>
    </Float>
  );
}

/* -------------------------------- Scene --------------------------------- */

function Scene({ lite }: { lite: boolean }) {
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 8);

  return (
    <>
      <Aurora />
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={18} color="#b7a2ff" />
      <pointLight position={[-6, -3, 2]} intensity={14} color="#82e6ff" />
      <pointLight position={[0, -5, 4]} intensity={10} color="#ff97d6" />

      <group scale={scale}>
        <Crystal lite={lite} />
      </group>

      <Sparkles
        count={lite ? 50 : 130}
        scale={[15, 9, 6]}
        size={3}
        speed={0.3}
        opacity={0.8}
        color="#e6dcff"
      />

      {!lite && (
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={2.4} position={[3, 3, 2]} scale={[6, 6, 1]} color="#b7a2ff" />
          <Lightformer intensity={2} position={[-4, -2, 1]} scale={[6, 6, 1]} color="#82e6ff" />
          <Lightformer intensity={1.6} position={[0, 3, -3]} scale={[8, 3, 1]} color="#ff97d6" />
        </Environment>
      )}

      {!lite && (
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={0.7}
            luminanceThreshold={0.62}
            luminanceSmoothing={0.25}
          />
        </EffectComposer>
      )}
    </>
  );
}

export default function HeroCanvas({ lite = false }: { lite?: boolean }) {
  return (
    <Canvas
      className="!pointer-events-none"
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={lite ? [1, 1.3] : [1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene lite={lite} />
    </Canvas>
  );
}
