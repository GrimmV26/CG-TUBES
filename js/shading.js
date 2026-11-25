import * as THREE from 'three';

export const MODE_SHADING = ['standar', 'phong', 'flat', 'toon', 'kerangka'];

const cache = new WeakMap();
let modeAktif = 'standar';
let gradienToon = null;

function gradien() {
  if (!gradienToon) {
    gradienToon = new THREE.DataTexture(new Uint8Array([70, 150, 255]), 3, 1, THREE.RedFormat);
    gradienToon.minFilter = gradienToon.magFilter = THREE.NearestFilter;
    gradienToon.needsUpdate = true;
  }
  return gradienToon;
}

function dasar(m) {
  return {
    color: m.color ? m.color.clone() : new THREE.Color(0xffffff),
    map: m.map || null,
    emissive: m.emissive ? m.emissive.clone() : new THREE.Color(0x000000),
    emissiveMap: m.emissiveMap || null,
    emissiveIntensity: m.emissiveIntensity ?? 1,
    transparent: m.transparent, opacity: m.opacity, side: m.side,
  };
}

function varian(asli, mode) {
  if (mode === 'standar') return asli;
  let v = cache.get(asli);
  if (!v) { v = {}; cache.set(asli, v); }
  if (!v[mode]) {
    if (mode === 'phong') {
      const m = new THREE.MeshPhongMaterial({ ...dasar(asli), shininess: 15 + (1 - (asli.roughness ?? 0.7)) * 70, specular: 0x333333 });
      v.phong = m;
    } else if (mode === 'flat') {
      const m = asli.clone(); m.flatShading = true; v.flat = m;
    } else if (mode === 'toon') {
      v.toon = new THREE.MeshToonMaterial({ ...dasar(asli), gradientMap: gradien() });
    } else if (mode === 'kerangka') {
      v.kerangka = new THREE.MeshBasicMaterial({ color: asli.map ? 0x2d3a73 : (asli.color || 0x2d3a73), wireframe: true, side: asli.side });
    }
  }
  return v[mode];
}

export function terapkanShading(akar, mode) {
  modeAktif = mode;
  for (const a of akar) a.traverse((o) => {
    if (!o.isMesh || o.userData.tanpaShading) return;
    if (!o.userData.matAsli) o.userData.matAsli = o.material;
    const asli = o.userData.matAsli;
    o.material = Array.isArray(asli) ? asli.map((m) => varian(m, mode)) : varian(asli, mode);
  });
}

export function setEmissive(asli, intensitas, warna) {
  const semua = [asli, ...Object.values(cache.get(asli) || {})];
  for (const m of semua) {
    if (!('emissiveIntensity' in m)) continue;
    m.emissiveIntensity = intensitas;
    if (warna && m.emissive) m.emissive.copy(warna);
  }
}

export function segarkanMaterial(akar) {
  for (const a of akar) a.traverse((o) => {
    if (!o.isMesh) return;
    for (const m of (Array.isArray(o.material) ? o.material : [o.material])) m.needsUpdate = true;
  });
}

export const modeSekarang = () => modeAktif;
