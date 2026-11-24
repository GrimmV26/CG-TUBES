import { $, $$, baris } from './bantu.js';

export function pasangKamera({ kamera, interaksi }) {
  const sudutBtn = $$('[data-sudut]');
  sudutBtn.forEach((b) => (b.onclick = () => kamera.pindahKe(b.dataset.sudut)));
  const projBtn = $$('[data-proyeksi]');
  const sFov = baris($('#s-kamera'), { label: 'Sudut pandang (FOV, perspektif)', min: 25, max: 100, step: 1, nilai: kamera.fov, fmt: (v) => v.toFixed(0) + '°', onInput: (v) => kamera.setFov(v) });
  projBtn.forEach((b) => (b.onclick = () => {
    kamera.setOrtografik(b.dataset.proyeksi === 'ortho');
    interaksi.setKamera(kamera.aktif);
    projBtn.forEach((x) => x.classList.toggle('aktif', x === b));
    sFov.aktif(!kamera.ortografik);
  }));

  let sudutLama;
  return {
    update() {
      const s = kamera.sudut;
      if (s !== sudutLama) { sudutLama = s; sudutBtn.forEach((b) => b.classList.toggle('aktif', b.dataset.sudut === s)); }
    },
  };
}
