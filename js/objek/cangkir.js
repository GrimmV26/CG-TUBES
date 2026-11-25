import * as THREE from 'three';
import { PI, M, B } from './bantu.js';

export function buatCangkir({ mat }) {
  const g = new THREE.Group();
  const s = new THREE.Group(); s.scale.setScalar(1.7); g.add(s);
  const tatakan = [[0, 0], [0.075, 0], [0.105, 0.012], [0.118, 0.026]].map((p) => new THREE.Vector2(p[0], p[1]));
  B(s, new THREE.LatheGeometry(tatakan, 28), mat.porselen);
  const cup = [[0, 0.012], [0.04, 0.012], [0.058, 0.025], [0.072, 0.07], [0.078, 0.092]].map((p) => new THREE.Vector2(p[0], p[1]));
  B(s, new THREE.LatheGeometry(cup, 28), mat.porselen);
  B(s, new THREE.TorusGeometry(0.078, 0.005, 6, 28), mat.emas, 0, 0.092, 0, PI / 2);
  const teh = B(s, new THREE.CircleGeometry(0.072, 24), M(0x8a4b2a, { roughness: 0.08 }), 0, 0.078, 0, -PI / 2);
  teh.castShadow = false;
  B(s, new THREE.TorusGeometry(0.03, 0.009, 8, 14, PI * 1.2), mat.porselen, 0.088, 0.058, 0, 0, 0, -PI / 2 - 0.3);
  return g;
}
