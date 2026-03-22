"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const t = Math.random();
      col[i * 3] = 0.38 + t * 0.3;
      col[i * 3 + 1] = 0.35 + t * 0.15;
      col[i * 3 + 2] = 0.95;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.48, 4]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.04} />
      </mesh>
    </Float>
  );
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const nodeCount = 30;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        )
      );
    }
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          points.push(nodes[i].x, nodes[i].y, nodes[i].z);
          points.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.06} />
    </lineSegments>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 three-canvas" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <ParticleField />
        <GlowingSphere />
        <ConnectingLines />
      </Canvas>
    </div>
  );
}
