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
  // base cerámica
  x.fillStyle = "#f7f3ff";
  x.fillRect(0, 0, 1024, 512);
  // wordmark holográfico
  const g = x.createLinearGradient(150, 0, 874, 0);
  g.addColorStop(0, "#8b5cf6");
  g.addColorStop(0.5, "#33b6ff");
  g.addColorStop(1, "#ff5fa8");
  x.fillStyle = g;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.font = "800 168px Bricolage Grotesque, Arial, sans-serif";
  x.fillText("tikitoki", 512, 215);
  // corazón + tagline
  x.font = "70px serif";
  x.fillText("💜", 512, 345);
  x.font = "600 40px Geist Mono, monospace";
  x.fillStyle = "#2a1f4a";
  x.fillText("lo viral, antes que nadie", 512, 420);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 16;
  tex.colorSpace = THREE.SRGBColorSpace;
  // centra el logo hacia delante
  tex.center.set(0.5, 0.5);
  tex.offset.set(0.25, 0);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function Mug() {
  const group = useRef<THREE.Group>(null);
  const label = useMemo(makeLabel, []);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.32;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.45}>
      <group ref={group} rotation={[0.16, -0.3, 0]}>
        {/* cuerpo */}
        <mesh castShadow>
          <cylinderGeometry args={[1.04, 0.92, 1.58, 96]} />
          <meshPhysicalMaterial
            map={label}
            roughness={0.22}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.18}
            iridescence={0.35}
            iridescenceIOR={1.3}
            envMapIntensity={1.1}
          />
        </mesh>
        {/* interior */}
        <mesh position={[0, 0.79, 0]}>
          <cylinderGeometry args={[0.93, 0.93, 0.05, 96]} />
          <meshStandardMaterial color="#2a1d52" roughness={0.5} />
        </mesh>
        {/* borde */}
        <mesh position={[0, 0.79, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.045, 24, 96]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.15} clearcoat={1} />
        </mesh>
        {/* asa: aro vertical en el lateral (la taza oculta la parte interior) */}
        <mesh position={[1.0, -0.05, 0]}>
          <torusGeometry args={[0.52, 0.1, 24, 96]} />
          <meshPhysicalMaterial
            map={label}
            roughness={0.22}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.18}
            iridescence={0.3}
            iridescenceIOR={1.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function MugCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.35, 4], fov: 38 }} dpr={[1, 2]} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 1, 2]} intensity={22} color="#b7a2ff" />
      <pointLight position={[3, -1, 2]} intensity={16} color="#82e6ff" />
      <pointLight position={[0, 2, -2]} intensity={10} color="#ff97d6" />
      <Mug />
      <ContactShadows position={[0, -1.15, 0]} opacity={0.5} scale={6} blur={2.6} far={3} />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} position={[2, 3, 2]} scale={[5, 5, 1]} color="#cdbcff" />
        <Lightformer intensity={2} position={[-3, -1, 1]} scale={[5, 5, 1]} color="#9fe9ff" />
        <Lightformer intensity={1.6} position={[0, -2, -2]} scale={[6, 3, 1]} color="#ffb4e2" />
        <Lightformer intensity={1.4} form="ring" position={[3, 2, 2]} scale={[2.5, 2.5, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
