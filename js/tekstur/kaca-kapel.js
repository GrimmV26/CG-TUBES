import { rng, canvasTex } from './dasar.js';

export function texKacaPatri(mode = 'mawar') {
  return canvasTex(512, 512, (g, w, h) => {
    const r = rng(mode === 'mawar' ? 61 : 67);
    const palette = ['#2f5fc2', '#4c8be8', '#d94f7a', '#f2a6c0', '#e9c24a', '#6a4fc9', '#38a3a5'];
    g.fillStyle = '#16204a'; g.fillRect(0, 0, w, h);
    if (mode === 'mawar') {
      const cx = w / 2, cy = h / 2, N = 16;
      for (let ring = 0; ring < 4; ring++) {
        const r0 = ring * 62 + (ring ? 12 : 0), r1 = (ring + 1) * 62 + 12;
        const seg = ring === 0 ? 1 : N;
        for (let k = 0; k < seg; k++) {
          const a0 = (k / seg) * Math.PI * 2, a1 = ((k + 1) / seg) * Math.PI * 2;
          g.fillStyle = palette[Math.floor(r() * palette.length)];
          g.beginPath(); g.arc(cx, cy, r1, a0, a1); g.arc(cx, cy, r0, a1, a0, true); g.closePath(); g.fill();
        }
      }
      g.fillStyle = '#ffe9a8'; g.beginPath(); g.arc(cx, cy, 34, 0, 7); g.fill();
      g.strokeStyle = '#0d1230'; g.lineWidth = 7;
      for (let k = 0; k < N; k++) { const a = (k / N) * Math.PI * 2; g.beginPath(); g.moveTo(cx + Math.cos(a) * 34, cy + Math.sin(a) * 34); g.lineTo(cx + Math.cos(a) * 262, cy + Math.sin(a) * 262); g.stroke(); }
      for (let rr = 34; rr <= 262; rr += 76) { g.beginPath(); g.arc(cx, cy, rr, 0, 7); g.stroke(); }
    } else {
      const cols = 3, rows = 8, cw = w / cols, rh = h / rows;
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        g.fillStyle = palette[Math.floor(r() * palette.length)];
        g.fillRect(i * cw, j * rh, cw, rh);
      }
      g.strokeStyle = '#0d1230'; g.lineWidth = 9;
      for (let i = 0; i <= cols; i++) { g.beginPath(); g.moveTo(i * cw, 0); g.lineTo(i * cw, h); g.stroke(); }
      for (let j = 0; j <= rows; j++) { g.beginPath(); g.moveTo(0, j * rh); g.lineTo(w, j * rh); g.stroke(); }
    }
  }, { wrap: false });
}

export function texPintu() {
  return canvasTex(256, 512, (g, w, h) => {
    const r = rng(71);
    g.fillStyle = '#5a3a2a'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) {
      g.fillStyle = `rgb(${86 + r() * 20},${54 + r() * 14},${38 + r() * 10})`;
      g.fillRect(i * 32 + 2, 0, 28, h);
    }
    g.strokeStyle = '#d9b45a'; g.lineWidth = 6;
    g.beginPath(); g.moveTo(w / 2, 0); g.lineTo(w / 2, h); g.stroke();
    g.lineWidth = 4;
    for (const y of [90, 250, 410]) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.fillStyle = '#d9b45a';
    for (const y of [90, 250, 410]) for (const x of [32, 96, 160, 224]) { g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); }
  }, { wrap: false });
}

export function texJam() {
  return canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = '#fbf7ec'; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill();
    g.strokeStyle = '#d9b45a'; g.lineWidth = 10; g.stroke();
    g.fillStyle = '#1d2b53'; g.font = 'bold 26px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const rom = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    rom.forEach((t, i) => { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; g.fillText(t, 128 + Math.cos(a) * 94, 128 + Math.sin(a) * 94); });
    g.strokeStyle = '#1d2b53'; g.lineCap = 'round';
    g.lineWidth = 9; g.beginPath(); g.moveTo(128, 128); g.lineTo(128 + 52 * Math.cos(-0.5), 128 + 52 * Math.sin(-0.5)); g.stroke();
    g.lineWidth = 6; g.beginPath(); g.moveTo(128, 128); g.lineTo(128 + 80 * Math.cos(1.9), 128 + 80 * Math.sin(1.9)); g.stroke();
    g.fillStyle = '#d9b45a'; g.beginPath(); g.arc(128, 128, 8, 0, 7); g.fill();
  }, { wrap: false });
}

export function texPanji() {
  return canvasTex(256, 640, (g, w, h) => {
    g.fillStyle = '#233a78'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#d9b45a'; g.lineWidth = 8; g.strokeRect(12, 12, w - 24, h - 24);
    g.lineWidth = 3; g.strokeRect(26, 26, w - 52, h - 52);
    g.lineWidth = 7; g.strokeStyle = '#f4e3a6';
    const cx = w / 2, cy = 250, R = 52, d = 34;
    for (const [x, y] of [[cx, cy - d], [cx - d * 0.95, cy + d * 0.6], [cx + d * 0.95, cy + d * 0.6]]) { g.beginPath(); g.arc(x, y, R, 0, 7); g.stroke(); }
    g.fillStyle = '#f4e3a6'; g.font = 'bold 34px Georgia, serif'; g.textAlign = 'center';
    g.fillText('TRINITY', w / 2, 420); g.font = '22px Georgia, serif'; g.fillText('GENERAL SCHOOL', w / 2, 456);
    g.fillRect(w / 2 - 50, 480, 100, 3);
  }, { wrap: false });
}
