import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M, B, kotakBatu, geoLengkung } from '../objek/bantu.js';

export function buatDindingSamping({ statis, mat, kacaLancet }) {
  for (const sx of [-1, 1]) {
    B(statis, kotakBatu(0.7, 3.2, 24), mat.batu, sx * 16, 1.6, 2);
    B(statis, kotakBatu(0.95, 0.25, 24.3), mat.batu, sx * 16, 3.3, 2);
    for (let z = -8; z <= 12; z += 4) {
      B(statis, kotakBatu(0.9, 3.9, 0.9), mat.batu, sx * 15.55, 1.95, z);
      B(statis, new THREE.ConeGeometry(0.62, 1.2, 4), mat.atap, sx * 15.55, 4.5, z, 0, PI / 4, 0);
    }
    for (let z = -6; z <= 10; z += 4) {
      const bingkai = new THREE.Mesh(geoLengkung(1.5, 2.6), mat.batuGelap);
      bingkai.position.set(sx * 15.62, 0.45, z); bingkai.rotation.y = -sx * PI / 2;
      statis.add(bingkai);
      const jendela = new THREE.Mesh(geoLengkung(1.2, 2.35), kacaLancet);
      jendela.position.set(sx * 15.6, 0.55, z); jendela.rotation.y = -sx * PI / 2;
      statis.add(jendela);
    }

    const pagar = B(statis, new THREE.BoxGeometry(1.1, 0.95, 22.5), M(0xffffff, { map: T.texRumput([4, 6]), color: 0x6c9a5a, roughness: 1 }), sx * 14.5, 0.47, 2.2);
    pagar.scale.set(1, 1, 1);
  }
}
