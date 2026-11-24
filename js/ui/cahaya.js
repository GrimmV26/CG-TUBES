import { $, $$, hex, baris, barisWarna, sub } from './bantu.js';

export function pasangCahaya({ cahaya }) {
  const S = cahaya.state, cont = $('#s-cahaya');
  sub(cont, 'Cahaya utama (matahari / bulan)');
  const sl = {};
  sl.sunI = baris(cont, { label: 'Intensitas', min: 0, max: 6, step: 0.05, nilai: S.sunIntensity, onInput: (v) => cahaya.setAngka('sunIntensity', v) });
  sl.sunC = barisWarna(cont, 'Warna cahaya', (h) => cahaya.setWarna('sunColor', h));
  sl.elev = baris(cont, { label: 'Ketinggian (elevasi)', min: 5, max: 90, step: 1, nilai: S.sunElev, fmt: (v) => v.toFixed(0) + '°', onInput: (v) => cahaya.setAngka('sunElev', v) });
  sl.az = baris(cont, { label: 'Arah (azimut)', min: -180, max: 180, step: 1, nilai: S.sunAz, fmt: (v) => v.toFixed(0) + '°', onInput: (v) => cahaya.setAngka('sunAz', v) });
  sub(cont, 'Cahaya sekitar (ambient)');
  sl.ambI = baris(cont, { label: 'Intensitas', min: 0, max: 2.5, step: 0.05, nilai: S.ambIntensity, onInput: (v) => cahaya.setAngka('ambIntensity', v) });
  sl.ambC = barisWarna(cont, 'Warna langit', (h) => cahaya.setWarna('ambColor', h));
  sub(cont, 'Lampu taman');
  sl.lampI = baris(cont, { label: 'Intensitas', min: 0, max: 150, step: 1, nilai: S.lampIntensity, fmt: (v) => v.toFixed(0), onInput: (v) => cahaya.setAngka('lampIntensity', v) });
  sl.lampC = barisWarna(cont, 'Warna lampu', (h) => cahaya.setWarna('lampColor', h));

  function sinkronCahaya() {
    sl.sunI.set(S.sunIntensity); sl.sunC.set(hex(S.sunColor));
    sl.elev.set(S.sunElev); sl.az.set(S.sunAz);
    sl.ambI.set(S.ambIntensity); sl.ambC.set(hex(S.ambColor));
    sl.lampI.set(S.lampIntensity); sl.lampC.set(hex(S.lampColor));
  }
  sinkronCahaya();
  cahaya.onChange = sinkronCahaya;
  const modeBtn = $$('[data-mode]');
  modeBtn.forEach((b) => (b.onclick = () => {
    cahaya.setMode(b.dataset.mode);
    modeBtn.forEach((x) => x.classList.toggle('aktif', x === b));
    cahaya.setSemuaLampu(true);
  }));
}
