import * as THREE from 'three';
import * as T from '../textures.js';
import { PI, M, B } from './bantu.js';

export function buatAirMancur({ mat, luz, pembaru }) {
  const g = new THREE.Group();
  const batuDS = M(0xffffff, { map: T.texBatu(), roughness: 0.9, side: THREE.DoubleSide });
  const kolam = [[0, 0.02], [2.3, 0.02], [2.36, 0.55], [2.52, 0.64], [2.52, 0.8], [2.14, 0.8], [2.14, 0.4], [0, 0.4]].map((p) => new THREE.Vector2(p[0], p[1]));
  B(g, new THREE.LatheGeometry(kolam, 56), batuDS);
  const air = M(0x6cc0e8, { transparent: true, opacity: 0.8, roughness: 0.06, metalness: 0.1 });
  const dasar = B(g, new THREE.CircleGeometry(2.14, 56), air, 0, 0.62, 0, -PI / 2); dasar.castShadow = false;
  const tiang = [[0, 0.4], [0.55, 0.4], [0.55, 0.65], [0.3, 0.9], [0.22, 1.3], [0.3, 1.55], [0.72, 1.66], [0.95, 1.86], [0.88, 1.9], [0.62, 1.8], [0, 1.8]].map((p) => new THREE.Vector2(p[0], p[1]));
  B(g, new THREE.LatheGeometry(tiang, 40), batuDS);
  const air2 = B(g, new THREE.CircleGeometry(0.72, 32), air, 0, 1.78, 0, -PI / 2); air2.castShadow = false;
  B(g, new THREE.SphereGeometry(0.13, 12, 10), mat.emas, 0, 1.95, 0);

  const N = 280, pos = new Float32Array(N * 3), vel = new Float32Array(N * 3);
  const mulai = (i) => {
    const a = Math.random() * PI * 2, h = 0.45 + Math.random() * 0.95;
    pos[i * 3] = 0; pos[i * 3 + 1] = 2.0; pos[i * 3 + 2] = 0;
    vel[i * 3] = Math.cos(a) * h; vel[i * 3 + 1] = 3.4 + Math.random() * 1.5; vel[i * 3 + 2] = Math.sin(a) * h;
  };
  for (let i = 0; i < N; i++) { mulai(i); const t0 = Math.random() * 1.2; for (let k = 0; k < 4; k++) { vel[i * 3 + 1] -= 7.5 * t0 / 4; pos[i * 3] += vel[i * 3] * t0 / 4; pos[i * 3 + 1] += vel[i * 3 + 1] * t0 / 4; pos[i * 3 + 2] += vel[i * 3 + 2] * t0 / 4; } }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xdff3ff, size: 0.09, transparent: true, opacity: 0.85, depthWrite: false }));
  pts.frustumCulled = false; pts.raycast = () => {}; pts.userData.tanpaShading = true;
  g.add(pts);

  const biru = new THREE.PointLight(0x6cc3ff, 0, 12, 2);
  biru.position.set(0, 0.9, 0); g.add(biru);
  luz.airMancur = biru;

  g.userData.air = { jalan: true, titik: pts };
  pembaru.push((dt) => {
    if (!g.userData.air.jalan) return;
    for (let i = 0; i < N; i++) {
      vel[i * 3 + 1] -= 7.5 * dt;
      pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      if (pos[i * 3 + 1] < 0.64) mulai(i);
    }
    pg.attributes.position.needsUpdate = true;
  });
  return g;
}
