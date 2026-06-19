"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

const fragment = /* glsl */ `
  uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform vec2 uRes;
  varying vec2 vUv;
  vec2 hash(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return -1.0+2.0*fract(sin(p)*43758.5453); }
  float noise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(dot(hash(i),f),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),
               mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
  float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
  void main(){
    vec2 uv = vUv;
    float t = uTime*0.025;
    vec2 p = uv*2.0 + vec2(0.0, uScroll*0.00018);
    float n  = fbm(p + vec2(t, -t*0.5)) + 0.5;
    float n2 = fbm(p*1.4 - vec2(t*0.4, t)) + 0.5;
    vec3 base = vec3(0.024, 0.013, 0.06);
    vec3 lila = vec3(0.34, 0.24, 0.62);
    vec3 azul = vec3(0.14, 0.38, 0.55);
    vec3 rosa = vec3(0.5, 0.22, 0.42);
    vec3 col = base;
    col = mix(col, lila, smoothstep(0.55, 1.05, n) * 0.45);
    col = mix(col, azul, smoothstep(0.62, 1.08, n2) * 0.32);
    col = mix(col, rosa, smoothstep(0.7, 1.15, n*n2) * 0.25);
    // resplandor que sigue al ratón
    vec2 m = uMouse; m.x *= uRes.x/uRes.y; vec2 uvr = uv; uvr.x *= uRes.x/uRes.y;
    float md = distance(uvr, m);
    col += lila * 0.16 * smoothstep(0.45, 0.0, md);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    const onResize = () =>
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    onResize();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [uniforms]);

  const { viewport } = useThree();

  useFrame((_, delta) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += Math.min(delta, 0.05);
    mat.current.uniforms.uScroll.value = window.scrollY;
    (mat.current.uniforms.uMouse.value as THREE.Vector2).lerp(mouse.current, 0.05);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthWrite={false} />
    </mesh>
  );
}

export default function AtmosphereCanvas() {
  return (
    <Canvas
      dpr={1}
      gl={{ antialias: false, alpha: false }}
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    >
      <Plane />
    </Canvas>
  );
}
