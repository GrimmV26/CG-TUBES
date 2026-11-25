import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

export function buatInteraksi({ scene, canvas, kamera, dunia, cahaya }) {
  const tc = new TransformControls(kamera.aktif, canvas);
  tc.setSize(0.9);
  scene.add(tc);

  const kotak = new THREE.BoxHelper(new THREE.Object3D(), 0xffd166);
  kotak.visible = false; kotak.material.depthTest = false; kotak.renderOrder = 999;
  scene.add(kotak);

  const raycaster = new THREE.Raycaster();
  const ptr = new THREE.Vector2();
  const akarPilih = dunia.objekList.map((o) => o.group);

  let terpilih = null;
  let cb = { onPilih() {}, onUbah() {}, onHover() {} };

  tc.addEventListener('dragging-changed', (e) => { kamera.orbit.enabled = !e.value; });
  tc.addEventListener('objectChange', () => cb.onUbah(terpilih));

  function cari(ev) {
    const r = canvas.getBoundingClientRect();
    ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ptr, kamera.aktif);
    const hit = raycaster.intersectObjects(akarPilih, true).find((h) => h.object.visible && !h.object.isPoints);
    if (!hit) return null;
    let o = hit.object;
    while (o && !o.userData.objekId) o = o.parent;
    return o ? dunia.objekList.find((e) => e.group === o) : null;
  }

  function pilih(entri) {
    terpilih = entri || null;
    if (terpilih) {
      tc.camera = kamera.aktif;
      tc.attach(terpilih.group);
      kotak.setFromObject(terpilih.group);
      kotak.visible = true;
    } else {
      tc.detach();
      kotak.visible = false;
    }
    cb.onPilih(terpilih);
  }
  const pilihId = (id) => pilih(dunia.objekList.find((o) => o.id === id));

  let down = null;
  canvas.addEventListener('pointerdown', (e) => {
    down = { x: e.clientX, y: e.clientY, t: performance.now(), gizmo: tc.axis !== null, btn: e.button };
  });
  canvas.addEventListener('pointerup', (e) => {
    if (!down) return;
    const d = down; down = null;
    if (d.btn !== 0 || d.gizmo) return;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) return;
    pilih(cari(e));
  });
  canvas.addEventListener('dblclick', (e) => {
    const o = cari(e);
    if (o && o.id.startsWith('lampu')) { const on = cahaya.toggleLampu(o.group); cb.onHover(o, `${o.nama}: ${on ? 'menyala' : 'mati'}`); }
    if (o && o.id === 'airmancur') { o.group.userData.air.jalan = !o.group.userData.air.jalan; o.group.userData.air.titik.visible = o.group.userData.air.jalan; }
  });
  let menunggu = false;
  canvas.addEventListener('pointermove', (e) => {
    if (e.buttons || tc.dragging || menunggu) return;
    menunggu = true;
    requestAnimationFrame(() => {
      menunggu = false;
      const o = cari(e);
      canvas.style.cursor = o ? 'pointer' : '';
      cb.onHover(o, null, e);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName) && e.target.type !== 'range' && e.target.type !== 'checkbox') return;
    const k = e.key.toLowerCase();
    if (k === 'w') setMode('translate');
    else if (k === 'e') setMode('rotate');
    else if (k === 'r') setMode('scale');
    else if (k === 'escape') pilih(null);
  });

  function setMode(m) { tc.setMode(m); cb.onPilih(terpilih, m); }

  const sentuh = () => { if (terpilih) { kotak.setFromObject(terpilih.group); cb.onUbah(terpilih); } };
  return {
    tc,
    set callbacks(c) { cb = { ...cb, ...c }; },
    get terpilih() { return terpilih; },
    pilih, pilihId, setMode,
    get mode() { return tc.mode; },
    setSnap(on) { tc.setTranslationSnap(on ? 0.25 : null); tc.setRotationSnap(on ? THREE.MathUtils.degToRad(15) : null); tc.setScaleSnap(on ? 0.1 : null); },
    setRuang(r) { tc.setSpace(r); },
    setKamera(c) { tc.camera = c; },
    setPos(sumbu, v) { if (!terpilih) return; terpilih.group.position[sumbu] = v; sentuh(); },
    setRotDeg(sumbu, v) { if (!terpilih) return; terpilih.group.rotation[sumbu] = THREE.MathUtils.degToRad(v); sentuh(); },
    setSkala(sumbu, v) { if (!terpilih) return; terpilih.group.scale[sumbu] = v; sentuh(); },
    geser(sumbu, d) { if (!terpilih) return; terpilih.group.position[sumbu] += d; sentuh(); },
    putarY(derajat) { if (!terpilih) return; terpilih.group.rotation.y += THREE.MathUtils.degToRad(derajat); sentuh(); },
    skalaKali(k) { if (!terpilih) return; terpilih.group.scale.multiplyScalar(k); sentuh(); },
    resetObjek() {
      if (!terpilih) return;
      const a = terpilih.awal, g = terpilih.group;
      g.position.copy(a.pos); g.rotation.copy(a.rot); g.scale.copy(a.skala); sentuh();
    },
    resetSemua() {
      for (const o of dunia.objekList) { o.group.position.copy(o.awal.pos); o.group.rotation.copy(o.awal.rot); o.group.scale.copy(o.awal.skala); }
      sentuh();
    },
    update() { if (terpilih && kotak.visible) kotak.update(); },
  };
}
