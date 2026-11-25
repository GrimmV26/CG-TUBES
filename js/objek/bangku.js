import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M, B } from './bantu.js';

export function buatBangku({ mat }) {
  const g = new THREE.Group();
  const kayu = M(0xffffff, { map: T.texKayu('#b98b5e'), roughness: 0.7 });
  for (const z of [-0.15, 0, 0.15]) B(g, new THREE.BoxGeometry(1.9, 0.045, 0.12), kayu, 0, 0.47, z);
  for (const y of [0.62, 0.76, 0.9]) B(g, new THREE.BoxGeometry(1.9, 0.1, 0.035), kayu, 0, y, -0.3 - (y - 0.62) * 0.18, -0.2, 0, 0);
  for (const x of [-0.88, 0.88]) {
    B(g, new THREE.CylinderGeometry(0.03, 0.025, 0.47, 8), mat.besi, x, 0.235, 0.2);
    B(g, new THREE.CylinderGeometry(0.03, 0.025, 0.95, 8), mat.besi, x, 0.475, -0.3);
    B(g, new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8), mat.besi, x, 0.68, -0.05, PI / 2, 0, 0);
    B(g, new THREE.TorusGeometry(0.12, 0.015, 6, 18), mat.besi, x, 0.28, -0.05, 0, PI / 2, 0);
    B(g, new THREE.SphereGeometry(0.05, 10, 8), mat.besi, x, 0.68, 0.23);
  }
  return g;
}
