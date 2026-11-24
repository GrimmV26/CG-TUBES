import * as THREE from 'three';
import * as T from '../textures.js';
import { M, B } from '../objek/bantu.js';

export function buatPetakBunga({ statis }) {
  const petak = [[-9.5, -6.6, 6, 1.6], [9.5, -6.6, 6, 1.6], [-13.2, 12.2, 4.6, 1.6], [12.4, 12.2, 3.2, 1.2], [-3.6, 11.8, 1, 1]];
  const palet = ['#f6a5bd', '#ffffff', '#f58fb0', '#e9d2ff', '#ffe08a', '#ff7aa0'].map((c) => new THREE.Color(c));
  const r = T.rng(77);
  let total = 0; petak.forEach((p) => { if (p[2] > 1.5) total += Math.round(p[2] * p[3] * 14); });
  const bunga = new THREE.InstancedMesh(new THREE.SphereGeometry(0.1, 8, 6), M(0xffffff, { roughness: 0.7 }), total);
  bunga.castShadow = true;
  const dummy = new THREE.Object3D(); let n = 0;
  for (const [px, pz, pw, pd] of petak) {
    if (pw <= 1.5) continue;
    const tanah = B(statis, new THREE.BoxGeometry(pw, 0.4, pd), M(0x5b4033, { roughness: 1 }), px, 0.2, pz);
    B(statis, new THREE.BoxGeometry(pw - 0.1, 0.1, pd - 0.1), M(0x3d8a4e, { roughness: 1, flatShading: true }), px, 0.43, pz);
    tanah.castShadow = false;
    const cnt = Math.round(pw * pd * 14);
    for (let i = 0; i < cnt; i++) {
      dummy.position.set(px + (r() - 0.5) * (pw - 0.25), 0.55 + r() * 0.14, pz + (r() - 0.5) * (pd - 0.25));
      dummy.scale.setScalar(0.7 + r() * 0.7); dummy.updateMatrix();
      bunga.setMatrixAt(n, dummy.matrix); bunga.setColorAt(n, palet[Math.floor(r() * palet.length)]); n++;
    }
  }
  bunga.instanceMatrix.needsUpdate = true; bunga.instanceColor.needsUpdate = true;
  statis.add(bunga);
}
