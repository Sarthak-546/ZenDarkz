'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useProjectStore } from '@/store/useProjectStore';

const IMAGES = [
  '/projects/pulse.jpg',
  '/projects/nebula.jpg',
  '/projects/quarry.jpg',
  '/projects/sprint.jpg',
];

function ImageDistortion() {
  const activeProject = useProjectStore((state) => state.activeProject);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const textures = useTexture(IMAGES);
  const dispTexture = useTexture('/displacement.jpg'); 

  useEffect(() => {
    if (!materialRef.current) return;
    
    if (activeProject !== null) {
      materialRef.current.uniforms.uTexture.value = textures[activeProject];
      gsap.to(materialRef.current.uniforms.uProgress, {
        value: 1,
        duration: 0.8,
        ease: 'power3.out'
      });
      gsap.to(materialRef.current.uniforms.uAlpha, {
        value: 1,
        duration: 0.4,
      });
    } else {
      gsap.to(materialRef.current.uniforms.uProgress, {
        value: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      });
      gsap.to(materialRef.current.uniforms.uAlpha, {
        value: 0,
        duration: 0.4,
        delay: 0.2
      });
    }
  }, [activeProject, textures]);

  const uniforms = useRef({
    uTexture: { value: textures[0] },
    uDispMap: { value: dispTexture },
    uProgress: { value: 0 },
    uAlpha: { value: 0 },
    uTime: { value: 0 }
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[3.5, 2.5, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms.current}
        vertexShader={`
          varying vec2 vUv;
          uniform float uProgress;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 3.14) * 0.1 * uProgress;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform sampler2D uDispMap;
          uniform float uProgress;
          uniform float uAlpha;
          uniform float uTime;
          
          void main() {
            vec4 disp = texture2D(uDispMap, vUv + uTime * 0.1);
            vec2 distortedUv = vUv + disp.rg * 0.05 * uProgress;
            
            vec4 color = texture2D(uTexture, distortedUv);
            gl_FragColor = vec4(color.rgb, uAlpha);
          }
        `}
      />
    </mesh>
  );
}

export function ProjectCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-70">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <Suspense fallback={null}>
          <ImageDistortion />
        </Suspense>
      </Canvas>
    </div>
  );
}