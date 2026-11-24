import * as THREE from 'three';
import { PI, B, kotakBatu } from '../objek/bantu.js';

export function buatPagarDepan({ statis, mat }) {
  for (const sx of [-1, 1]) {
    B(statis, kotakBatu(13.2, 0.9, 0.6), mat.batu, sx * 9.4, 0.45, 14);
    B(statis, kotakBatu(13.4, 0.15, 0.8), mat.batu, sx * 9.4, 0.98, 14);
    for (const px of [sx * 2.9, sx * 6.2, sx * 9.5, sx * 12.8, sx * 15.7]) {
      const tinggi = Math.abs(px) < 3 ? 2.8 : 1.5;
      B(statis, kotakBatu(0.85, tinggi, 0.85), mat.batu, px, tinggi / 2, 14);
      if (tinggi > 2) {
        B(statis, new THREE.ConeGeometry(0.6, 1.0, 4), mat.atap, px, tinggi + 0.5, 14, 0, PI / 4, 0);
        B(statis, new THREE.SphereGeometry(0.14, 12, 8), mat.emas, px, tinggi + 1.05, 14);
      } else {
        B(statis, new THREE.SphereGeometry(0.28, 14, 10), mat.batu, px, tinggi + 0.2, 14);
      }
    }
  }
}
