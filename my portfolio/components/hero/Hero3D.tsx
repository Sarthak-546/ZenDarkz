'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function GlassTorus() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, (state.pointer.y * Math.PI) / 4, 0.05);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (state.pointer.x * Math.PI) / 4, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh}>
        <torusGeometry args={[1.5, 0.4, 64, 128]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={0.5} 
          chromaticAberration={0.05} 
          anisotropy={0.1} 
          distortion={0.2} 
          distortionScale={0.3} 
          temporalDistortion={0.1} 
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

export function GlassTorusCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          <GlassTorus />
        </Suspense>
      </Canvas>
    </div>
  );
}