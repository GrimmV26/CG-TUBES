import * as THREE from 'three';
import { setMaxAnisotropy } from './textures.js';
import { buatDunia } from './objects.js';
import { buatPencahayaan } from './lighting.js';
import { buatKamera } from './camera.js';
import { buatInteraksi } from './interaction.js';
import { terapkanShading, segarkanMaterial } from './shading.js';
import { pasangUI } from './ui.js';

const canvas = document.getElementById('kanvas');
const $memuat = document.getElementById('memuat');

function tampilkanGalat(pesan) {
  const el = document.getElementById('galat');
  el.hidden = false; el.innerHTML = pesan;
  $memuat.classList.add('selesai');
}

try {
  if (!window.WebGL2RenderingContext) throw new Error('WebGL2 tidak tersedia');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  setMaxAnisotropy(Math.min(8, renderer.capabilities.getMaxAnisotropy()));

  const scene = new THREE.Scene();
  const dunia = buatDunia(scene);
  const cahaya = buatPencahayaan(scene, renderer, dunia);
  const kamera = buatKamera(canvas);
  const interaksi = buatInteraksi({ scene, canvas, kamera, dunia, cahaya });

  const bantu = new THREE.Group(); bantu.visible = false;
  const sumbu = new THREE.AxesHelper(7); sumbu.position.y = 0.08;
  const grid = new THREE.GridHelper(32, 32, 0xe5484d, 0x6a7090); grid.position.set(0, 0.07, 2); grid.scale.z = 0.75;
  grid.material.transparent = true; grid.material.opacity = 0.55;
  bantu.add(sumbu, grid); scene.add(bantu);

  const akarShading = [dunia.statis, ...dunia.objekList.map((o) => o.group)];
  const aksi = {
    setShading: (m) => terapkanShading(akarShading, m),
    setBayangan: (on) => { cahaya.setBayangan(on); segarkanMaterial(akarShading); },
    setSumbu: (on) => { bantu.visible = on; },
  };
  const ui = pasangUI({ kamera, cahaya, interaksi, dunia, aksi });

  function ubahUkuran() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    kamera.ukuran(w, h);
  }
  window.addEventListener('resize', ubahUkuran);
  ubahUkuran();

  const jam = new THREE.Clock();
  const fpsEl = document.getElementById('fps');
  let frame = 0, acc = 0, pertama = true;
  renderer.setAnimationLoop(() => {
    const dt = Math.min(jam.getDelta(), 0.05), t = jam.elapsedTime;
    for (const f of dunia.pembaru) f(dt, t);
    cahaya.update(dt);
    kamera.update(dt);
    interaksi.update();
    ui.update();
    renderer.render(scene, kamera.aktif);

    if (pertama) { pertama = false; $memuat.classList.add('selesai'); }
    frame++; acc += dt;
    if (acc >= 0.5) { fpsEl.textContent = Math.round(frame / acc) + ' fps'; frame = 0; acc = 0; }
  });

  window.__dunia = { THREE, scene, renderer, dunia, cahaya, kamera, interaksi, aksi };
} catch (err) {
  console.error(err);
  tampilkanGalat(`<h2>Dunia 3D tidak bisa dimuat</h2><p>${err.message}</p>
    <p>Pastikan browser mendukung WebGL2, dan buka lewat server lokal (mis. <code>npx serve</code>, ekstensi Live Server VS Code, atau GitHub Pages) — bukan dengan klik dua kali <code>index.html</code>.</p>`);
}
