import * as THREE from 'three';
import * as T from '../textures.js';
import { M } from '../objek/bantu.js';

export function buatPlaza({ statis, mat }) {
  const atas = M(0xffffff, { map: T.texMarmer([16, 12]), roughness: 0.35 });
  const sisi = M(0xcfc6b8, { roughness: 0.9 });
  const plaza = new THREE.Mesh(new THREE.BoxGeometry(32, 0.3, 24), [sisi, sisi, atas, sisi, sisi, sisi]);
  plaza.position.set(0, -0.15, 2);
  plaza.receiveShadow = true;
  statis.add(plaza);

  const jalan = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.05, 24), [mat.batuGelap, mat.batuGelap,
    M(0xffffff, { map: T.texPaving([2, 12]), roughness: 0.9 }), mat.batuGelap, mat.batuGelap, mat.batuGelap]);
  jalan.position.set(0, 0.025, 2);
  jalan.receiveShadow = true; jalan.castShadow = true;
  statis.add(jalan);
}
