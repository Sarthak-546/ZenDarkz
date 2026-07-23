'use client';

import { extend, useFrame, useThree, Canvas } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { FluidShaderMaterial } from './FluidShaderMaterial';

extend({ FluidShaderMaterial });

export function HeroFluid() {
  const materialRef = useRef<any>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uMouse.lerp(mouse.current, 0.05);
      materialRef.current.uResolution.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <fluidShaderMaterial ref={materialRef} transparent opacity={0.8} />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <HeroFluid />
        </Suspense>
      </Canvas>
    </div>
  );
}