import { rng, canvasTex } from './dasar.js';

export function texKayu(base = '#9a6a43', repeat = [1, 1]) {
  return canvasTex(256, 256, (g, w, h) => {
    const r = rng(53);
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 90; i++) {
      const y = r() * h;
      g.strokeStyle = `rgba(${r() < .5 ? '60,35,15' : '210,170,120'},${0.08 + r() * .16})`;
      g.lineWidth = 0.6 + r() * 2;
      g.beginPath(); g.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) g.lineTo(x, y + Math.sin(x * .03 + i) * 3);
      g.stroke();
    }
  }, { repeat });
}

export function texTaplak(repeat = [3, 3]) {
  return canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = '#fff6f6'; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(240,150,175,.55)';
    for (let i = 0; i < 4; i++) { g.fillRect(i * 64 + 8, 0, 22, h); g.fillRect(0, i * 64 + 8, w, 22); }
    g.fillStyle = 'rgba(225,110,150,.6)';
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) g.fillRect(i * 64 + 8, j * 64 + 8, 22, 22);
    g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = 1;
    for (let i = 0; i < 16; i++) { g.beginPath(); g.arc(i * 16 + 8, 8, 5, 0, Math.PI * 2); g.stroke(); }
  }, { repeat });
}
