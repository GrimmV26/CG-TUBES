import * as THREE from 'three';
import { canvasTex } from './dasar.js';

export function texTulisan(lines, { w = 1024, h = 256, bg = '#1d2b53', fg = '#f4e3a6', sizes = [74, 40], border = '#d9b45a' } = {}) {
  return canvasTex(w, h, (g) => {
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    if (border) { g.strokeStyle = border; g.lineWidth = 8; g.strokeRect(10, 10, w - 20, h - 20); }
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    const n = lines.length;
    lines.forEach((t, i) => {
      g.font = `${i === 0 ? 'bold ' : ''}${sizes[i] || sizes[sizes.length - 1]}px Georgia, 'Times New Roman', serif`;
      g.fillText(t, w / 2, (h / (n + 1)) * (i + 1));
    });
  }, { wrap: false });
}

export function muatFoto(url, label, rasioBingkai = 3 / 4) {
  const tex = canvasTex(300, 400, (g, w, h) => {
    g.fillStyle = '#e8dbe3'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(w / 2, 150, 60, 0, 7); g.fill(); g.fillRect(70, 230, 160, 170);
    g.fillStyle = '#1d2b53'; g.font = 'bold 22px sans-serif'; g.textAlign = 'center'; g.fillText(label, w / 2, 340);
  }, { wrap: false });
  tex.userData.dimuat = false;
  new THREE.TextureLoader().load(
    url,
    (loaded) => {
      const img = loaded.image;
      tex.image = img;
      const rasioFoto = img.width / img.height;
      tex.repeat.set(1, 1); tex.offset.set(0, 0);
      if (rasioFoto > rasioBingkai) { tex.repeat.x = rasioBingkai / rasioFoto; tex.offset.x = (1 - tex.repeat.x) / 2; }
      else { tex.repeat.y = rasioFoto / rasioBingkai; tex.offset.y = (1 - tex.repeat.y) / 2; }
      tex.userData.dimuat = true;
      tex.dispose();
      tex.needsUpdate = true;
    },
    undefined,
    () => console.warn('[tekstur] Foto tidak ditemukan:', url, '— memakai gambar pengganti.')
  );
  return tex;
}
