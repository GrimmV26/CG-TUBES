import * as THREE from 'three';
import { PI, B, kotakBatu, geoLengkung } from '../objek/bantu.js';

export function buatSayapBelakang({ statis, mat, kacaLancet }) {
  for (const sx of [-1, 1]) {
    B(statis, kotakBatu(6.7, 5.6, 1.2), mat.batu, sx * 12.65, 2.8, -10.6);
    B(statis, kotakBatu(7.0, 0.3, 1.5), mat.batu, sx * 12.65, 5.75, -10.6);
    for (const px of [sx * 10, sx * 12.65, sx * 15.3]) {
      B(statis, new THREE.ConeGeometry(0.4, 0.9, 4), mat.atap, px, 6.25, -10.45, 0, PI / 4, 0);
    }
    for (const dx of [-1.6, 1.6]) {
      const j = new THREE.Mesh(geoLengkung(1.2, 3.4), kacaLancet);
      j.position.set(sx * 12.65 + dx, 1.4, -9.98);
      statis.add(j);
    }
  }
}
