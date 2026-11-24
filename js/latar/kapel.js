import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M, B, kotakBatu, skalaUV, lengkung, geoLengkung } from '../objek/bantu.js';

export function buatKapel({ statis, mat, kaca, kacaMat, kacaLancet, luz }) {
  const g = new THREE.Group();
  g.position.set(0, 0, -11.2);
  statis.add(g);

  const W = 12, Heave = 9, Hapex = 12.2;
  const sh = new THREE.Shape();
  sh.moveTo(-W / 2, 0); sh.lineTo(W / 2, 0); sh.lineTo(W / 2, Heave); sh.lineTo(0, Hapex); sh.lineTo(-W / 2, Heave); sh.lineTo(-W / 2, 0);
  const pintu = new THREE.Path(); lengkung(pintu, 0, 0, 3.4, 5.4); sh.holes.push(pintu);
  const bundar = new THREE.Path(); bundar.absarc(0, 7.5, 1.55, 0, PI * 2, false); sh.holes.push(bundar);
  for (const sx of [-1, 1]) { const l = new THREE.Path(); lengkung(l, sx * 4.2, 2.8, 1.4, 4.6); sh.holes.push(l); }
  const muka = new THREE.Mesh(skalaUV(new THREE.ExtrudeGeometry(sh, { depth: 1.2, bevelEnabled: false, curveSegments: 24 }), 0.25), mat.batu);
  muka.castShadow = true; muka.receiveShadow = true;
  g.add(muka);

  B(g, kotakBatu(12, 9, 12), mat.batu, 0, 4.5, -6);

  const sudut = Math.atan2(3.2, 6), pjg = Math.hypot(6, 3.2) + 0.5;
  for (const sx of [-1, 1]) {
    const a = B(g, new THREE.BoxGeometry(pjg, 0.28, 13.6), mat.atap, sx * 3.05, 10.7, -5.6, 0, 0, -sx * sudut);
    a.material.map.repeat.set(7, 3);
  }
  B(g, new THREE.BoxGeometry(0.35, 0.3, 13.6), mat.emas, 0, 12.35, -5.6);

  B(g, new THREE.BoxGeometry(0.16, 1.5, 0.16), mat.emas, 0, 13.1, 0.6);
  B(g, new THREE.BoxGeometry(0.8, 0.16, 0.16), mat.emas, 0, 13.45, 0.6);

  const pintuKayu = new THREE.Mesh(geoLengkung(3.4, 5.4), M(0xffffff, { map: T.texPintu(), roughness: 0.8 }));
  pintuKayu.position.set(0, 0, 0.55); g.add(pintuKayu);
  const mawar = new THREE.Mesh(new THREE.CircleGeometry(1.55, 48), kacaMat(T.texKacaPatri('mawar'), 0.15, 1.6));
  mawar.position.set(0, 7.5, 0.6); g.add(mawar);
  B(g, new THREE.TorusGeometry(1.62, 0.09, 10, 48), mat.emas, 0, 7.5, 1.18);
  for (const sx of [-1, 1]) {
    const l = new THREE.Mesh(geoLengkung(1.4, 4.6), kacaLancet);
    l.position.set(sx * 4.2, 2.8, 0.6); g.add(l);
  }

  for (let i = 0; i < 3; i++) {
    const lebar = 6.8 - i * 0.9, dalam = 0.8 + (3 - i) * 0.55, tinggi = 0.16 * (i + 1);
    B(g, kotakBatu(lebar, tinggi, dalam), mat.batu, 0, tinggi / 2, 1.2 + dalam / 2);
  }

  const kacaMawarKecil = kacaMat(T.texKacaPatri('mawar'), 0.15, 1.6);
  const panji = M(0xffffff, { map: T.texPanji(), roughness: 0.95, side: THREE.DoubleSide });
  const gelap = M(0x151a33, { roughness: 0.6, emissive: 0xffb866, emissiveIntensity: 0.0 });
  kaca.push({ mat: gelap, min: 0.0, max: 0.9 });
  for (const sx of [-1, 1]) {
    const tx = sx * 7.6, tz = -0.5;
    B(g, kotakBatu(3.4, 14, 3.4), mat.batu, tx, 7, tz);
    B(g, kotakBatu(3.9, 0.4, 3.9), mat.batu, tx, 14.15, tz);
    B(g, new THREE.ConeGeometry(2.75, 6.5, 4), mat.atap, tx, 17.6, tz, 0, PI / 4, 0).material.map.repeat.set(2, 2);
    B(g, new THREE.SphereGeometry(0.24, 12, 10), mat.emas, tx, 21.0, tz);
    B(g, new THREE.BoxGeometry(0.14, 1.1, 0.14), mat.emas, tx, 21.7, tz);
    B(g, new THREE.BoxGeometry(0.6, 0.14, 0.14), mat.emas, tx, 21.9, tz);
    for (const [cx, cz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      B(g, new THREE.ConeGeometry(0.28, 1.2, 4), mat.atap, tx + cx * 1.75, 14.95, tz + cz * 1.75, 0, PI / 4, 0);
    }

    const depanZ = tz + 1.7 + 0.02;
    const lan1 = new THREE.Mesh(geoLengkung(1.0, 2.8), kacaLancet); lan1.position.set(tx, 5.2, depanZ); g.add(lan1);
    const bel1 = new THREE.Mesh(geoLengkung(1.1, 2.4), gelap); bel1.position.set(tx, 11.2, depanZ); g.add(bel1);
    const luarX = tx + sx * (1.7 + 0.02);
    const lan2 = new THREE.Mesh(geoLengkung(1.0, 2.8), kacaLancet); lan2.position.set(luarX, 5.2, tz); lan2.rotation.y = sx * PI / 2; g.add(lan2);
    const bel2 = new THREE.Mesh(geoLengkung(1.1, 2.4), gelap); bel2.position.set(luarX, 11.2, tz); bel2.rotation.y = sx * PI / 2; g.add(bel2);
    const ban = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 3.7), panji); ban.position.set(tx, 2.75, depanZ + 0.02); ban.castShadow = true; g.add(ban);

    if (sx > 0) {
      const jam = new THREE.Mesh(new THREE.CircleGeometry(0.95, 40), M(0xffffff, { map: T.texJam(), roughness: 0.4 }));
      jam.position.set(tx, 9.7, depanZ); g.add(jam);
    } else {
      const bw = new THREE.Mesh(new THREE.CircleGeometry(0.95, 40), kacaMawarKecil);
      bw.position.set(tx, 9.7, depanZ); g.add(bw);
    }
  }

  const pl = new THREE.PointLight(0xffc680, 0, 18, 2);
  pl.position.set(0, 2.6, 3.2);
  g.add(pl);
  luz.kapel = pl;
}
