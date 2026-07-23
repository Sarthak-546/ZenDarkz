import { MaterialNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    fluidShaderMaterial: MaterialNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial>;
  }
}