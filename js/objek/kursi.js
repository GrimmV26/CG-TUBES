import * as THREE from 'three';
import { PI, B } from './bantu.js';

export function buatKursi({ mat }) {
  const g = new THREE.Group();
  const besi = mat.besi;
  B(g, new THREE.CylinderGeometry(0.3, 0.3, 0.05, 28), besi, 0, 0.45, 0);
  B(g, new THREE.CylinderGeometry(0.27, 0.27, 0.07, 28), mat.bantal, 0, 0.5, 0);
  for (let i = 0; i < 4; i++) {
    const a = i * PI / 2 + PI / 4;
    B(g, new THREE.CylinderGeometry(0.02, 0.014, 0.45, 8), besi, Math.cos(a) * 0.22, 0.225, Math.sin(a) * 0.22);
  }
  B(g, new THREE.TorusGeometry(0.27, 0.022, 8, 28, PI), besi, 0, 0.62, -0.26);
  B(g, new THREE.TorusGeometry(0.15, 0.014, 8, 20, PI), besi, 0, 0.7, -0.26);
  for (const x of [-0.27, 0.27]) B(g, new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8), besi, x, 0.55, -0.26);
  B(g, new THREE.CylinderGeometry(0.014, 0.014, 0.22, 8), besi, 0, 0.72, -0.26);
  B(g, new THREE.TorusGeometry(0.3, 0.016, 8, 28), besi, 0, 0.2, 0, PI / 2);
  return g;
}
