import { KELOMPOK, ANGGOTA } from './config.js';
import { $ } from './ui/bantu.js';
import { pasangKamera } from './ui/kamera.js';
import { pasangCahaya } from './ui/cahaya.js';
import { pasangObjek } from './ui/objek.js';

export function pasangUI({ kamera, cahaya, interaksi, dunia, aksi }) {

  $('#grup').textContent = `${KELOMPOK.nama} · ${ANGGOTA.map((a) => a.nama).join(', ')}`;

  const panel = $('#panel'), btnBuka = $('#btn-buka');
  $('#btn-tutup').onclick = () => { panel.classList.add('tertutup'); btnBuka.hidden = false; };
  btnBuka.onclick = () => { panel.classList.remove('tertutup'); btnBuka.hidden = true; };

  const uiKamera = pasangKamera({ kamera, interaksi });
  pasangCahaya({ cahaya });
  pasangObjek({ cahaya, interaksi, dunia, aksi });

  return { update: uiKamera.update };
}
