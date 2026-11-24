import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ORTHO_HH = 20;

export const SUDUT = {

  bebas: { pos: [17, 11, 35], target: [-2.5, 5.5, 0] },
  depan: { pos: [0, 6.5, 40], target: [0, 6.5, 0] },
  atas: { pos: [0, 44, 2.001], target: [0, 0, 2] },
};

export function buatKamera(canvas) {
  const persp = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  const ortho = new THREE.OrthographicCamera(-ORTHO_HH, ORTHO_HH, ORTHO_HH, -ORTHO_HH, 0.1, 1000);
  let aktif = persp;
  let aspek = 1;

  const orbit = new OrbitControls(persp, canvas);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.08;
  orbit.maxPolarAngle = Math.PI / 2;
  orbit.minDistance = 2.5;
  orbit.maxDistance = 95;
  orbit.minZoom = 0.25; orbit.maxZoom = 10;
  orbit.screenSpacePanning = true;

  let anim = null;
  let namaSudut = 'bebas';
  orbit.addEventListener('start', () => { anim = null; namaSudut = null; });

  const tanSetengahFov = () => Math.tan(THREE.MathUtils.degToRad(persp.fov / 2));
  const set = (cam, s) => { cam.position.set(...s.pos); };

  function ukuran(w, h) {
    aspek = w / h;
    persp.aspect = aspek; persp.updateProjectionMatrix();
    ortho.left = -ORTHO_HH * aspek; ortho.right = ORTHO_HH * aspek;
    ortho.top = ORTHO_HH; ortho.bottom = -ORTHO_HH;
    ortho.updateProjectionMatrix();
  }

  const zoomDariJarak = (d) => ORTHO_HH / (d * tanSetengahFov());
  const jarakDariZoom = (z) => ORTHO_HH / (z * tanSetengahFov());

  function setOrtografik(on) {
    if (on === (aktif === ortho)) return;
    const target = orbit.target;
    if (on) {
      const d = persp.position.distanceTo(target);
      ortho.position.copy(persp.position); ortho.quaternion.copy(persp.quaternion);
      ortho.zoom = zoomDariJarak(d);
      ortho.updateProjectionMatrix();
      aktif = ortho;
    } else {
      const arah = ortho.position.clone().sub(target).normalize();
      const d = THREE.MathUtils.clamp(jarakDariZoom(ortho.zoom), orbit.minDistance, orbit.maxDistance);
      persp.position.copy(target).addScaledVector(arah, d);
      persp.quaternion.copy(ortho.quaternion);
      aktif = persp;
    }
    orbit.object = aktif;
    orbit.update();
    anim = null;
  }

  function pindahKe(nama) {
    const s = SUDUT[nama]; if (!s) return;
    namaSudut = nama;
    const tujuanPos = new THREE.Vector3(...s.pos), tujuanTarget = new THREE.Vector3(...s.target);
    anim = {
      t: 0,
      posA: aktif.position.clone(), posB: tujuanPos,
      tgtA: orbit.target.clone(), tgtB: tujuanTarget,
      zA: aktif.zoom, zB: aktif === ortho ? zoomDariJarak(tujuanPos.distanceTo(tujuanTarget)) : 1,
    };
  }

  function update(dt) {
    if (anim) {
      anim.t = Math.min(1, anim.t + dt / 0.85);
      const e = anim.t * anim.t * (3 - 2 * anim.t);
      aktif.position.lerpVectors(anim.posA, anim.posB, e);
      orbit.target.lerpVectors(anim.tgtA, anim.tgtB, e);
      if (aktif === ortho) { ortho.zoom = anim.zA + (anim.zB - anim.zA) * e; ortho.updateProjectionMatrix(); }
      if (anim.t >= 1) anim = null;
    }
    orbit.update();
  }

  function setFov(v) {
    const d = persp.position.distanceTo(orbit.target);
    persp.fov = v; persp.updateProjectionMatrix();
    if (aktif === ortho) { ortho.zoom = zoomDariJarak(d); ortho.updateProjectionMatrix(); }
  }

  set(persp, SUDUT.bebas);
  orbit.target.set(...SUDUT.bebas.target);
  orbit.update();

  return {
    persp, ortho, orbit,
    get aktif() { return aktif; },
    get ortografik() { return aktif === ortho; },
    get sudut() { return namaSudut; },
    ukuran, update, pindahKe, setOrtografik, setFov,
    get fov() { return persp.fov; },
  };
}
