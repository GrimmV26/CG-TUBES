import * as THREE from 'three';
import * as T from './textures.js';
import { buatBahan, buatKacaMat } from './objek/bahan.js';

import { buatTanah } from './latar/tanah.js';
import { buatPlaza } from './latar/plaza.js';
import { buatDindingSamping } from './latar/dinding.js';
import { buatPagarDepan } from './latar/pagar.js';
import { buatSayapBelakang } from './latar/sayap.js';
import { buatKapel } from './latar/kapel.js';
import { buatPetakBunga } from './latar/bunga.js';
import { buatHutan } from './latar/hutan.js';

import { tempatkanSetTeh } from './penempatan/set-teh.js';
import { tempatkanTaman } from './penempatan/taman.js';

export function buatDunia(scene) {
  const objekList = [];
  const lampu = [];
  const kaca = [];
  const fotoTex = [];
  const pembaru = [];
  const luz = {};

  const { mat, tanahTex } = buatBahan();
  const kacaMat = buatKacaMat(kaca);

  const statis = new THREE.Group();
  statis.name = 'statis';
  scene.add(statis);

  const ctx = { scene, statis, mat, tanahTex, kacaMat, kaca, lampu, luz, pembaru, fotoTex };

  function daftar(id, nama, group, x, z, ry = 0, y = 0) {
    group.position.set(x, y, z);
    group.rotation.y = ry;
    group.userData.objekId = id;
    scene.add(group);
    objekList.push({
      id, nama, group,
      awal: { pos: group.position.clone(), rot: group.rotation.clone(), skala: group.scale.clone() },
    });
    return group;
  }

  buatTanah(ctx);
  buatPlaza(ctx);
  ctx.kacaLancet = kacaMat(T.texKacaPatri('lancet'), 0.15, 1.3);
  buatDindingSamping(ctx);
  buatPagarDepan(ctx);
  buatSayapBelakang(ctx);
  buatKapel(ctx);
  buatPetakBunga(ctx);
  buatHutan(ctx);

  tempatkanSetTeh(ctx, daftar);
  tempatkanTaman(ctx, daftar);

  return { objekList, lampu, kaca, fotoTex, luz, pembaru, statis };
}
