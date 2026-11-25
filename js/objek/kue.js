import * as THREE from 'three';
import { PI, M, B } from './bantu.js';

export function buatKue({ mat }) {
  const g = new THREE.Group();
  const s = new THREE.Group(); s.scale.setScalar(1.5); g.add(s);
  const p = mat.porselenRose;
  B(s, new THREE.CylinderGeometry(0.34, 0.3, 0.025, 32), p, 0, 0.012, 0);
  B(s, new THREE.CylinderGeometry(0.025, 0.035, 0.17, 10), mat.emas, 0, 0.1, 0);
  B(s, new THREE.CylinderGeometry(0.27, 0.24, 0.022, 32), p, 0, 0.195, 0);
  B(s, new THREE.CylinderGeometry(0.022, 0.03, 0.15, 10), mat.emas, 0, 0.27, 0);
  B(s, new THREE.CylinderGeometry(0.19, 0.17, 0.022, 32), p, 0, 0.355, 0);
  B(s, new THREE.SphereGeometry(0.03, 10, 8), mat.emas, 0, 0.375, 0);
  const krim = M(0xffe3ec, { roughness: 0.6 }), coklat = M(0x6b3f2a, { roughness: 0.7 }), stroberi = M(0xd6264a, { roughness: 0.35 });
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * PI * 2;
    B(s, new THREE.CylinderGeometry(0.07, 0.07, 0.055, 16), coklat, Math.cos(a) * 0.22, 0.055, Math.sin(a) * 0.22);
    B(s, new THREE.CylinderGeometry(0.072, 0.072, 0.025, 16), krim, Math.cos(a) * 0.22, 0.095, Math.sin(a) * 0.22);
    B(s, new THREE.SphereGeometry(0.025, 8, 6), stroberi, Math.cos(a) * 0.22, 0.125, Math.sin(a) * 0.22);
  }
  const pastel = [0xf6a5bd, 0xc8e6c9, 0xfff0a8, 0xd9c8ff, 0xffd0b0];
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * PI * 2 + 0.3;
    const mac = B(s, new THREE.SphereGeometry(0.052, 12, 8), M(pastel[i], { roughness: 0.5 }), Math.cos(a) * 0.15, 0.235, Math.sin(a) * 0.15);
    mac.scale.y = 0.62;
  }
  B(s, new THREE.CylinderGeometry(0.105, 0.105, 0.085, 20), krim, 0, 0.405, 0);
  B(s, new THREE.CylinderGeometry(0.108, 0.108, 0.02, 20), M(0xf58fb0, { roughness: 0.5 }), 0, 0.455, 0);
  B(s, new THREE.SphereGeometry(0.04, 10, 8), stroberi, 0, 0.495, 0);
  return g;
}
