import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M } from '../objek/bantu.js';

export function buatHutan({ statis }) {
  const r = T.rng(91), n = 90;
  const pohon = new THREE.InstancedMesh(new THREE.ConeGeometry(2.4, 10, 7), M(0x2b5a3b, { roughness: 1, flatShading: true }), n);
  const d = new THREE.Object3D(), warna = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const a = r() * PI * 2, rad = 48 + r() * 40, s = 0.8 + r() * 1.1;
    d.position.set(Math.cos(a) * rad, 5 * s - 0.15, Math.sin(a) * rad); d.scale.set(s, s, s); d.updateMatrix();
    pohon.setMatrixAt(i, d.matrix); pohon.setColorAt(i, warna.setHSL(0.36 + r() * 0.05, 0.4, 0.2 + r() * 0.1));
  }
  pohon.castShadow = false; pohon.receiveShadow = false;
  statis.add(pohon);
}
