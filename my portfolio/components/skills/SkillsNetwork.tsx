'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line, Sphere } from '@react-three/drei';

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'WebGL', 'GSAP', 'Framer', 
  'Three.js', 'Tailwind', 'Node.js', 'GLSL', 'Vercel', 'Figma'
];

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  
const nodes = useMemo(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const r = 2.5;
    return SKILLS.map((_, i) => {
      const y = 1 - (i / (SKILLS.length - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      return new THREE.Vector3(
        Math.cos(theta) * radiusAtY * r,
        y * r,
        Math.sin(theta) * radiusAtY * r
      );
    });
  }, []);

  const lines = useMemo(() => {
    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3.5) {
          connections.push([nodes[i], nodes[j]]);
        }
      }
    }
    return connections;
  }, [nodes]);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;

    const targetX = pointer.y * 0.5;
    const targetY = pointer.x * 0.5;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line 
          key={`line-${i}`}
          points={line}
          color="#ffffff"
          opacity={0.15}
          transparent
          lineWidth={1}
        />
      ))}
      {nodes.map((pos, i) => (
        <group key={`node-${i}`} position={pos}>
          <Sphere args={[0.06, 16, 16]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

export function SkillsCanvas() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#030303', 3, 8]} />
        <Suspense fallback={null}>
          <NetworkGraph />
        </Suspense>
      </Canvas>
    </div>
  );
}