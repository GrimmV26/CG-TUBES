import { rng, canvasTex } from './dasar.js';

export function texMarmer(repeat = [8, 6]) {
  return canvasTex(512, 512, (g, w, h) => {
    const r = rng(11);
    const n = 2, s = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const light = (i + j) % 2 === 0;
      g.fillStyle = light ? '#f1ebe0' : '#d9c3c6';
      g.fillRect(i * s, j * s, s, s);

      g.strokeStyle = light ? 'rgba(160,150,140,.18)' : 'rgba(120,90,100,.16)';
      for (let k = 0; k < 7; k++) {
        g.lineWidth = 0.6 + r() * 1.4;
        g.beginPath();
        let x = i * s + r() * s, y = j * s + r() * s;
        g.moveTo(x, y);
        for (let m = 0; m < 4; m++) { x += (r() - .5) * 90; y += (r() - .5) * 90; g.lineTo(x, y); }
        g.stroke();
      }
    }
    g.strokeStyle = 'rgba(90,80,80,.45)'; g.lineWidth = 3;
    for (let i = 0; i <= n; i++) { g.beginPath(); g.moveTo(i * s, 0); g.lineTo(i * s, h); g.stroke(); g.beginPath(); g.moveTo(0, i * s); g.lineTo(w, i * s); g.stroke(); }
  }, { repeat });
}

export function texPaving(repeat = [2, 12]) {
  return canvasTex(512, 512, (g, w, h) => {
    const r = rng(23);
    g.fillStyle = '#9d9590'; g.fillRect(0, 0, w, h);
    const rows = 8, rh = h / rows;
    for (let j = 0; j < rows; j++) {
      let x = -(r() * 40);
      while (x < w) {
        const bw = 60 + r() * 50;
        const v = 190 + r() * 40;
        g.fillStyle = `rgb(${v},${v - 6},${v - 12})`;
        g.fillRect(x + 2, j * rh + 2, bw - 4, rh - 4);
        g.fillStyle = 'rgba(0,0,0,.05)';
        for (let k = 0; k < 14; k++) g.fillRect(x + r() * bw, j * rh + r() * rh, 2, 2);
        x += bw;
      }
    }
  }, { repeat });
}

export function texRumput(repeat = [30, 30]) {
  return canvasTex(256, 256, (g, w, h) => {
    const r = rng(5);
    g.fillStyle = '#6fae5e'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2400; i++) {
      const x = r() * w, y = r() * h, l = 4 + r() * 8, a = (r() - .5) * .8;
      g.strokeStyle = `hsl(${95 + r() * 30},${40 + r() * 20}%,${30 + r() * 28}%)`;
      g.lineWidth = 1.2;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(a) * l, y - Math.cos(a) * l); g.stroke();
    }
  }, { repeat });
}

export function texBatu(repeat = [1, 1]) {
  return canvasTex(512, 512, (g, w, h) => {
    const r = rng(31);
    g.fillStyle = '#e9e2d3'; g.fillRect(0, 0, w, h);
    const rows = 8, rh = h / rows;
    for (let j = 0; j < rows; j++) {
      const off = (j % 2) * 64;
      for (let i = -1; i < 5; i++) {
        const v = 224 + (r() * 16 - 8);
        g.fillStyle = `rgb(${v},${v - 6},${v - 18})`;
        g.fillRect(i * 128 + off + 2, j * rh + 2, 124, rh - 4);
        g.fillStyle = 'rgba(120,100,80,.07)';
        for (let k = 0; k < 30; k++) g.fillRect(i * 128 + off + r() * 124, j * rh + r() * rh, 3, 2);
      }
    }
    g.strokeStyle = 'rgba(120,105,90,.55)'; g.lineWidth = 3;
    for (let j = 0; j <= rows; j++) { g.beginPath(); g.moveTo(0, j * rh); g.lineTo(w, j * rh); g.stroke(); }
    for (let j = 0; j < rows; j++) {
      const off = (j % 2) * 64;
      for (let i = -1; i < 6; i++) { g.beginPath(); g.moveTo(i * 128 + off, j * rh); g.lineTo(i * 128 + off, (j + 1) * rh); g.stroke(); }
    }
  }, { repeat });
}

export function texAtap(repeat = [6, 2]) {
  return canvasTex(256, 256, (g, w, h) => {
    const r = rng(41);
    g.fillStyle = '#3f5a8f'; g.fillRect(0, 0, w, h);
    const rows = 8, rh = h / rows;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < 9; i++) {
        const x = i * 32 + (j % 2) * 16 - 16, y = j * rh;
        const l = 48 + r() * 10;
        g.fillStyle = `hsl(220,${34 + r() * 8}%,${l}%)`;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + 32, y); g.lineTo(x + 32, y + rh * .55);
        g.arc(x + 16, y + rh * .55, 16, 0, Math.PI); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(15,25,55,.55)'; g.lineWidth = 1.5; g.stroke();
      }
    }
  }, { repeat });
}
