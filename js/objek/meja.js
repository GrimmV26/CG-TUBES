import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M, B } from './bantu.js';

export function buatMeja({ mat }) {
  const g = new THREE.Group();
  const kainAtas = M(0xffffff, { map: T.texTaplak([3, 3]), roughness: 0.9 });
  const kainSisi = M(0xffffff, { map: T.texTaplak([9, 2]), roughness: 0.9, side: THREE.DoubleSide });
  B(g, new THREE.CylinderGeometry(1.15, 1.15, 0.06, 56), kainAtas, 0, 0.78, 0);
  B(g, new THREE.CylinderGeometry(1.17, 1.36, 0.78, 56, 1, true), kainSisi, 0, 0.39, 0);
  B(g, new THREE.TorusGeometry(1.16, 0.025, 8, 56), mat.emas, 0, 0.81, 0, PI / 2);
  B(g, new THREE.TorusGeometry(1.36, 0.05, 8, 56), M(0xf2a6b8, { roughness: 0.8 }), 0, 0.05, 0, PI / 2);
  return g;
}
