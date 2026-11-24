import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M, B } from './bantu.js';

export function buatPohon(seed) {
  const g = new THREE.Group(), r = T.rng(seed);
  const kulit = M(0x6b4a38, { roughness: 1, flatShading: true });
  B(g, new THREE.CylinderGeometry(0.16, 0.28, 2.4, 9), kulit, 0, 1.2, 0);
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * PI * 2 + r();
    B(g, new THREE.CylinderGeometry(0.05, 0.1, 1.3, 7), kulit, Math.cos(a) * 0.45, 2.55, Math.sin(a) * 0.45, Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7);
  }
  const merah = [0xf7b6c8, 0xffc8d6, 0xf4a3bb, 0xffd6e0];
  const blob = [[0, 3.8, 0, 1.35], [0.9, 3.4, 0.3, 1.0], [-0.85, 3.5, -0.2, 1.05], [0.2, 3.3, -0.9, 0.95], [-0.2, 3.5, 0.95, 0.95], [0.1, 4.55, 0.1, 0.85], [1.2, 3.9, -0.7, 0.7]];
  blob.forEach(([x, y, z, rad], i) => B(g, new THREE.IcosahedronGeometry(rad, 1), M(merah[i % 4], { roughness: 0.9, flatShading: true }), x, y, z));
  return g;
}
