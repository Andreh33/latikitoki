"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

function makeLabel() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const x = c.getContext("2d")!;
  x.fillStyle = "#f6f2ff";
  x.fillRect(0, 0, 1024, 512);
  const g = x.createLinearGradient(180, 0, 840, 0);
  g.addColorStop(0, "#8b5cf6");
  g.addColorStop(0.5, "#3ab6ff");
  g.addColorStop(1, "#ff5fa8");
  x.fillStyle = g;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.font = "800 150px Bricolage Grotesque, Arial, sans-serif";
  x.fillText("tikitoki", 512, 230);
  x.font = "600 54px Geist Mono, monospace";
  x.fillStyle = "#1a0f33";
  x.fillText("lo viral, antes que nadie", 512, 360);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Mug() {
  const group = useRef<THREE.Group>(null);
  const label = useMemo(makeLabel, []);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.5;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={group} rotation={[0.18, 0, 0]}>
        {/* cuerpo */}
        <mesh castShadow>
          <cylinderGeometry args={[1.02, 0.9, 1.55, 64]} />
          <meshStandardMaterial map={label} roughness={0.25} metalness={0.05} />
        </mesh>
        {/* interior */}
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.06, 64]} />
          <meshStandardMaterial color="#241844" roughness={0.4} />
        </mesh>
        {/* borde */}
        <mesh position={[0, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.05, 16, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* asa */}
        <mesh position={[1.02, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.46, 0.12, 20, 48, Math.PI * 1.25]} />
          <meshStandardMaterial color="#f6f2ff" roughness={0.25} metalness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

export default function MugCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.4, 4.2], fov: 38 }} dpr={[1, 1.8]} shadows>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 3]} intensity={1.4} castShadow />
      <pointLight position={[-3, 1, 2]} intensity={20} color="#b7a2ff" />
      <pointLight position={[3, -1, 2]} intensity={14} color="#82e6ff" />
      <Mug />
      <ContactShadows position={[0, -1.1, 0]} opacity={0.45} scale={6} blur={2.5} far={3} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2} position={[2, 3, 2]} scale={[5, 5, 1]} color="#cdbcff" />
        <Lightformer intensity={1.6} position={[-3, -1, 1]} scale={[5, 5, 1]} color="#9fe9ff" />
      </Environment>
    </Canvas>
  );
}
