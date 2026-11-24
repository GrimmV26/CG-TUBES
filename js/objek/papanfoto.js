import * as THREE from 'three';
import * as T from '../textures.js';
import { M, B } from './bantu.js';
import { KELOMPOK, ANGGOTA } from '../config.js';

export function buatPapanFoto({ mat, fotoTex }) {
  const g = new THREE.Group();
  const navy = M(0x1d2b53, { roughness: 0.6 });
  for (const x of [-1.75, 1.75]) B(g, new THREE.BoxGeometry(0.18, 2.6, 0.18), mat.kayuGelap, x, 1.3, -0.05);
  B(g, new THREE.BoxGeometry(4.5, 2.55, 0.14), navy, 0, 2.05, 0);
  for (const [w, h, x, y] of [[4.6, 0.09, 0, 3.35], [4.6, 0.09, 0, 0.75], [0.09, 2.7, -2.27, 2.05], [0.09, 2.7, 2.27, 2.05]])
    B(g, new THREE.BoxGeometry(w, h, 0.2), mat.emas, x, y, 0.01);
  const judul = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 0.5),
    new THREE.MeshStandardMaterial({ map: T.texTulisan([KELOMPOK.nama, 'Trinity General School'], { w: 1024, h: 200, sizes: [64, 34] }), roughness: 0.6 }));
  judul.position.set(0, 3.02, 0.075); g.add(judul);
  const n = Math.min(ANGGOTA.length, 3);
  ANGGOTA.slice(0, n).forEach((a, i) => {
    const x = (i - (n - 1) / 2) * 1.38;
    B(g, new THREE.BoxGeometry(1.2, 1.58, 0.06), mat.emas, x, 1.9, 0.1);
    const foto = T.muatFoto(a.foto, a.nama, 1.04 / 1.4);
    fotoTex.push(foto);
    const bidang = new THREE.Mesh(new THREE.PlaneGeometry(1.04, 1.4), new THREE.MeshStandardMaterial({ map: foto, roughness: 0.45 }));
    bidang.position.set(x, 1.9, 0.135); bidang.castShadow = false; g.add(bidang);
    const nama = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.26),
      new THREE.MeshStandardMaterial({ map: T.texTulisan([a.nama], { w: 512, h: 128, sizes: [50] }), roughness: 0.6 }));
    nama.position.set(x, 1.0, 0.075); g.add(nama);
  });
  return g;
}
