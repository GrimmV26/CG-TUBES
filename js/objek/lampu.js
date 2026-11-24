import * as THREE from 'three';
import { PI, B } from './bantu.js';

export function buatLampu({ mat, lampu }, id) {
  const g = new THREE.Group();
  B(g, new THREE.CylinderGeometry(0.22, 0.3, 0.35, 8), mat.batu, 0, 0.175, 0);
  B(g, new THREE.CylinderGeometry(0.13, 0.2, 0.35, 8), mat.hitam, 0, 0.5, 0);
  B(g, new THREE.CylinderGeometry(0.05, 0.075, 2.65, 10), mat.hitam, 0, 1.9, 0);
  B(g, new THREE.TorusGeometry(0.1, 0.022, 8, 16), mat.emas, 0, 1.4, 0, PI / 2);
  B(g, new THREE.TorusGeometry(0.09, 0.02, 8, 16), mat.emas, 0, 3.22, 0, PI / 2);
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xfff1c8, emissive: 0xffcf7a, emissiveIntensity: 0.05, roughness: 0.2, transparent: true, opacity: 0.92 });
  B(g, new THREE.CylinderGeometry(0.2, 0.14, 0.5, 6), bulbMat, 0, 3.47, 0).castShadow = false;
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * PI * 2 + PI / 6;
    B(g, new THREE.CylinderGeometry(0.014, 0.014, 0.52, 5), mat.hitam, Math.cos(a) * 0.178, 3.47, Math.sin(a) * 0.178, 0, 0, Math.cos(a) * 0.14);
  }
  B(g, new THREE.ConeGeometry(0.33, 0.32, 6), mat.emas, 0, 3.88, 0);
  B(g, new THREE.SphereGeometry(0.06, 10, 8), mat.emas, 0, 4.08, 0);
  const light = new THREE.PointLight(0xffd39a, 0, 0, 2);
  light.position.set(0, 3.47, 0);
  g.add(light);
  lampu.push({ id, group: g, light, bulbMat, on: true });
  return g;
}
