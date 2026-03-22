"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      const t = Math.random();
      col[i * 3] = 0.6 + t * 0.4;
      col[i * 3 + 1] = 0.6 + t * 0.4;
      col[i * 3 + 2] = 0.6 + t * 0.4;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.8, 3]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.04} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.78, 3]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.02} />
      </mesh>
    </Float>
  );
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const nodeCount = 25;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 7
        )
      );
    }
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.8) {
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
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.03} />
    </lineSegments>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 three-canvas" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <ParticleField />
        <WireframeSphere />
        <ConnectingLines />
      </Canvas>
    </div>
  );
}
