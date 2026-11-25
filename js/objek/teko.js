import * as THREE from 'three';
import { PI, B } from './bantu.js';

export function buatTeko({ mat }) {
  const g = new THREE.Group();
  const s = new THREE.Group(); s.scale.setScalar(1.7); g.add(s);
  const pts = [[0, 0], [0.09, 0], [0.13, 0.015], [0.16, 0.06], [0.17, 0.115], [0.155, 0.17], [0.12, 0.205], [0.085, 0.222], [0.078, 0.235]].map((p) => new THREE.Vector2(p[0], p[1]));
  B(s, new THREE.LatheGeometry(pts, 36), mat.porselenRose);
  const tutup = [[0.0, 0.235], [0.052, 0.235], [0.076, 0.245], [0.06, 0.268], [0.0, 0.278]].map((p) => new THREE.Vector2(p[0], p[1]));
  B(s, new THREE.LatheGeometry(tutup, 24), mat.porselenRose);
  B(s, new THREE.SphereGeometry(0.02, 10, 8), mat.emas, 0, 0.292, 0);
  B(s, new THREE.TorusGeometry(0.079, 0.006, 6, 28), mat.emas, 0, 0.236, 0, PI / 2);
  B(s, new THREE.TorusGeometry(0.115, 0.005, 6, 32), mat.emas, 0, 0.12, 0, PI / 2);
  B(s, new THREE.CylinderGeometry(0.016, 0.034, 0.2, 14), mat.porselenRose, 0.2, 0.135, 0, 0, 0, -0.6);
  B(s, new THREE.TorusGeometry(0.068, 0.014, 8, 18, PI), mat.porselenRose, -0.165, 0.125, 0, 0, 0, PI / 2);
  return g;
}
