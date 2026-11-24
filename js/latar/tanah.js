import * as THREE from 'three';
import { PI, M } from '../objek/bantu.js';

export function buatTanah({ statis, tanahTex }) {
  const tanah = new THREE.Mesh(new THREE.CircleGeometry(150, 64), M(0xffffff, { map: tanahTex, roughness: 1 }));
  tanah.material.map.repeat.set(70, 70);
  tanah.rotation.x = -PI / 2;
  tanah.position.y = -0.15;
  tanah.receiveShadow = true;
  statis.add(tanah);
}
