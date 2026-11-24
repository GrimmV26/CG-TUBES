import * as THREE from 'three';
import * as T from '../textures.js';
import { M } from './bantu.js';

export function buatBahan() {
  const texBatu = T.texBatu();
  const mat = {
    batu: M(0xffffff, { map: texBatu, roughness: 0.92 }),
    batuGelap: M(0xb4aa9a, { roughness: 0.95 }),
    emas: M(0xe3bd5a, { metalness: 0.3, roughness: 0.35 }),
    besi: M(0xf4f0e9, { roughness: 0.5, metalness: 0.1 }),
    hitam: M(0x23263a, { roughness: 0.5, metalness: 0.3 }),
    porselen: M(0xfdfbf7, { roughness: 0.25, side: THREE.DoubleSide }),
    porselenRose: M(0xfbe3ea, { roughness: 0.25, side: THREE.DoubleSide }),
    bantal: M(0xf2a6b8, { roughness: 0.9 }),
    atap: M(0xffffff, { map: T.texAtap(), roughness: 0.7 }),
    hijau: M(0x2f7d46, { roughness: 0.9, flatShading: true }),
    kayuGelap: M(0x5a3a2a, { roughness: 0.8 }),
  };
  const tanahTex = T.texRumput();
  return { mat, tanahTex };
}

export function buatKacaMat(kaca) {
  return function kacaMat(tex, min = 0.12, max = 1.5) {
    const m = new THREE.MeshStandardMaterial({
      map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: min,
      roughness: 0.2, metalness: 0, side: THREE.DoubleSide,
    });
    kaca.push({ mat: m, min, max });
    return m;
  };
}
