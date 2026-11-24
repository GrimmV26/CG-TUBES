import * as THREE from 'three';

export const PI = Math.PI;

export const M = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o });

export function B(parent, geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

export function boxUV(geo, w, h, d, tile = 4) {
  const uv = geo.attributes.uv;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) {
    const k = f * 4 + i;
    uv.setXY(k, uv.getX(k) * dims[f][0] / tile, uv.getY(k) * dims[f][1] / tile);
  }
  uv.needsUpdate = true;
  return geo;
}
export const kotakBatu = (w, h, d, tile = 4) => boxUV(new THREE.BoxGeometry(w, h, d), w, h, d, tile);

export function skalaUV(geo, k) {
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * k, uv.getY(i) * k);
  uv.needsUpdate = true;
  return geo;
}
export function normUV(geo) {
  geo.computeBoundingBox();
  const bb = geo.boundingBox, p = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++)
    uv.setXY(i, (p.getX(i) - bb.min.x) / (bb.max.x - bb.min.x), (p.getY(i) - bb.min.y) / (bb.max.y - bb.min.y));
  uv.needsUpdate = true;
  return geo;
}

export function lengkung(p, cx, y0, w, h) {
  const hw = w / 2, spring = h - hw * 1.15;
  p.moveTo(cx - hw, y0);
  p.lineTo(cx + hw, y0);
  p.lineTo(cx + hw, y0 + spring);
  p.quadraticCurveTo(cx + hw, y0 + spring + hw * 0.9, cx, y0 + h);
  p.quadraticCurveTo(cx - hw, y0 + spring + hw * 0.9, cx - hw, y0 + spring);
  p.lineTo(cx - hw, y0);
  return p;
}
export function geoLengkung(w, h) {
  const s = lengkung(new THREE.Shape(), 0, 0, w, h);
  return normUV(new THREE.ShapeGeometry(s, 16));
}
