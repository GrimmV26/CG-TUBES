import * as THREE from 'three';
import { $, $$, baris, wrap180 } from './bantu.js';

export function pasangObjek({ cahaya, interaksi, dunia, aksi }) {

  $$('input[name=shading]').forEach((r) => r.addEventListener('change', () => aksi.setShading(r.value)));
  $('#cb-bayangan').onchange = (e) => aksi.setBayangan(e.target.checked);
  $('#cb-kabut').onchange = (e) => cahaya.setKabut(e.target.checked);
  $('#cb-sumbu').onchange = (e) => aksi.setSumbu(e.target.checked);
  $('#cb-air').onchange = (e) => {
    const a = dunia.objekList.find((o) => o.id === 'airmancur').group.userData.air;
    a.jalan = e.target.checked; a.titik.visible = a.jalan;
  };

  const sel = $('#pilih-objek');
  sel.innerHTML = '<option value="">— belum ada —</option>' + dunia.objekList.map((o) => `<option value="${o.id}">${o.nama}</option>`).join('');
  sel.onchange = () => interaksi.pilihId(sel.value);

  const gizmoBtn = $$('[data-gizmo]');
  gizmoBtn.forEach((b) => (b.onclick = () => interaksi.setMode(b.dataset.gizmo)));
  $('#cb-snap').onchange = (e) => interaksi.setSnap(e.target.checked);
  $('#cb-lokal').onchange = (e) => interaksi.setRuang(e.target.checked ? 'local' : 'world');

  $$('#cepat button').forEach((b) => (b.onclick = () => {
    if (b.dataset.g) { const [s, d] = b.dataset.g.split(','); interaksi.geser(s, +d); }
    else if (b.dataset.r) interaksi.putarY(+b.dataset.r);
    else if (b.dataset.k) interaksi.skalaKali(+b.dataset.k);
  }));

  const sPos = {}, sRot = {}, sSk = {};
  const rentang = { x: [-20, 20], y: [-3, 12], z: [-14, 20] };
  for (const a of ['x', 'y', 'z']) {
    sPos[a] = baris($('#s-pos'), { label: a.toUpperCase(), min: rentang[a][0], max: rentang[a][1], step: 0.05, fmt: (v) => v.toFixed(2), onInput: (v) => interaksi.setPos(a, v) });
    sRot[a] = baris($('#s-rot'), { label: a.toUpperCase(), min: -180, max: 180, step: 1, fmt: (v) => v.toFixed(0) + '°', onInput: (v) => interaksi.setRotDeg(a, v) });
    sSk[a] = baris($('#s-skala'), {
      label: a.toUpperCase(), min: 0.2, max: 4, step: 0.01, nilai: 1,
      onInput: (v) => {
        if ($('#cb-kunci').checked) { for (const b of ['x', 'y', 'z']) { interaksi.setSkala(b, v); sSk[b].set(v); } }
        else interaksi.setSkala(a, v);
      },
    });
  }
  function sinkronTransform(e) {
    const ada = !!e;
    for (const a of ['x', 'y', 'z']) { sPos[a].aktif(ada); sRot[a].aktif(ada); sSk[a].aktif(ada); }
    if (!e) return;
    const g = e.group;
    for (const a of ['x', 'y', 'z']) {
      sPos[a].set(g.position[a]);
      sRot[a].set(wrap180(THREE.MathUtils.radToDeg(g.rotation[a])));
      sSk[a].set(g.scale[a]);
    }
  }
  sinkronTransform(null);

  $('#btn-reset-objek').onclick = () => interaksi.resetObjek();
  $('#btn-reset-semua').onclick = () => interaksi.resetSemua();

  const tip = $('#tip');
  let pesanTimer = 0;
  addEventListener('pointermove', (e) => { tip.style.left = e.clientX + 'px'; tip.style.top = e.clientY + 'px'; });

  interaksi.callbacks = {
    onPilih(e, modeBaru) {
      sel.value = e ? e.id : '';
      $('#info-pilih').textContent = e ? `Terpilih: ${e.nama}. Seret panah/lingkaran/kotak di adegan, atau pakai slider & tombol.` : 'Klik sebuah benda di adegan, atau pilih dari daftar.';
      gizmoBtn.forEach((b) => b.classList.toggle('aktif', b.dataset.gizmo === interaksi.mode));
      sinkronTransform(e);
      if (e) $('#b-objek').open = true;
    },
    onUbah: sinkronTransform,
    onHover(o, pesan) {
      if (pesan) { tip.textContent = pesan; tip.hidden = false; clearTimeout(pesanTimer); pesanTimer = setTimeout(() => (tip.hidden = true), 1600); return; }
      if (pesanTimer && !tip.hidden && !o) return;
      if (o) { tip.textContent = o.nama; tip.hidden = false; } else tip.hidden = true;
    },
  };
}
