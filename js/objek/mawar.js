import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M, B } from './bantu.js';

export function buatMawar({ mat }, seed) {
  const g = new THREE.Group(), r = T.rng(seed);
  B(g, new THREE.CylinderGeometry(0.8, 0.62, 0.55, 18), mat.batu, 0, 0.275, 0);
  B(g, new THREE.TorusGeometry(0.8, 0.07, 8, 24), mat.batu, 0, 0.56, 0, PI / 2);
  B(g, new THREE.CylinderGeometry(0.72, 0.72, 0.05, 18), M(0x4a3428, { roughness: 1 }), 0, 0.58, 0);
  const blobs = [];
  for (let i = 0; i < 6; i++) {
    const rad = 0.42 + r() * 0.24, a = r() * PI * 2, d = r() * 0.42;
    const c = [Math.cos(a) * d, 0.95 + r() * 0.4, Math.sin(a) * d];
    B(g, new THREE.IcosahedronGeometry(rad, 1), mat.hijau, c[0], c[1], c[2]);
    blobs.push({ c, rad });
  }
  const warna = [0xe8456b, 0xf58fb0, 0xffffff, 0xff7aa0, 0xd91e4a];
  for (let i = 0; i < 26; i++) {
    const b = blobs[Math.floor(r() * blobs.length)];
    const v = new THREE.Vector3(r() - 0.5, r() * 0.9 - 0.15, r() - 0.5).normalize().multiplyScalar(b.rad * 0.98);
    B(g, new THREE.SphereGeometry(0.085, 10, 8), M(warna[Math.floor(r() * warna.length)], { roughness: 0.55 }), b.c[0] + v.x, b.c[1] + v.y, b.c[2] + v.z).castShadow = false;
  }
  return g;
}
