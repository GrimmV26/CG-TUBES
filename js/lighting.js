import * as THREE from 'three';
import { buatLangit } from './langit.js';
import { setEmissive } from './shading.js';

export const PRESET = {
  siang: {
    sunColor: '#fff1d6', sunIntensity: 3.2, sunElev: 48, sunAz: 22,
    ambColor: '#bcd9ff', ambGround: '#d8c8ae', ambIntensity: 1.0,
    lampColor: '#ffd39a', lampIntensity: 0,
    skyTop: '#4f9cf5', skyBottom: '#cfe6ff', stars: 0, glow: 0, exposure: 1.0,
    cloud: '#ffffff', disc: '#fff4c2',
  },
  malam: {
    sunColor: '#8fa8ff', sunIntensity: 0.75, sunElev: 36, sunAz: -32,
    ambColor: '#2c3868', ambGround: '#0f1226', ambIntensity: 0.6,
    lampColor: '#ffcf8f', lampIntensity: 42,
    skyTop: '#050816', skyBottom: '#1b2650', stars: 1, glow: 1, exposure: 1.2,
    cloud: '#2b3563', disc: '#e8efff',
  },
};
const ANGKA = ['sunIntensity', 'sunElev', 'sunAz', 'ambIntensity', 'lampIntensity', 'stars', 'glow', 'exposure'];
const WARNA = ['sunColor', 'ambColor', 'ambGround', 'lampColor', 'skyTop', 'skyBottom', 'cloud', 'disc'];

function parse(p) {
  const s = {};
  ANGKA.forEach((k) => (s[k] = p[k]));
  WARNA.forEach((k) => (s[k] = new THREE.Color(p[k])));
  return s;
}
function salin(s) {
  const n = {};
  ANGKA.forEach((k) => (n[k] = s[k]));
  WARNA.forEach((k) => (n[k] = s[k].clone()));
  return n;
}

export function buatPencahayaan(scene, renderer, dunia) {
  const langit = buatLangit(scene);

  const matahari = new THREE.DirectionalLight(0xffffff, 1);
  matahari.castShadow = true;
  matahari.shadow.mapSize.set(2048, 2048);
  const sc = matahari.shadow.camera;
  sc.left = -29; sc.right = 29; sc.top = 29; sc.bottom = -29; sc.near = 1; sc.far = 170;
  matahari.shadow.bias = -0.0004; matahari.shadow.normalBias = 0.04;
  scene.add(matahari, matahari.target);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x888888, 1);
  scene.add(hemi);

  scene.fog = new THREE.Fog(0xcfe6ff, 80, 260);

  const state = parse(PRESET.siang);
  let mode = 'siang';
  let dari = null, ke = null, t = 1;
  const DURASI = 1.6;
  let onChange = () => {};
  const arah = new THREE.Vector3();
  let kabutAktif = true;

  function terapkan() {

    matahari.color.copy(state.sunColor); matahari.intensity = state.sunIntensity;
    const el = THREE.MathUtils.degToRad(state.sunElev), az = THREE.MathUtils.degToRad(state.sunAz);
    arah.set(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az));
    matahari.position.copy(arah).multiplyScalar(80);
    langit.cakram.position.copy(arah).multiplyScalar(330);
    langit.cakram.material.color.copy(state.disc);

    hemi.color.copy(state.ambColor); hemi.groundColor.copy(state.ambGround); hemi.intensity = state.ambIntensity;

    const rasio = THREE.MathUtils.clamp(state.lampIntensity / 40, 0, 3);
    for (const l of dunia.lampu) {
      l.light.color.copy(state.lampColor);
      l.light.intensity = l.on ? state.lampIntensity : 0;
      setEmissive(l.bulbMat, l.on ? 0.08 + 2.4 * Math.min(rasio, 1.6) : 0.05, state.lampColor);
    }
    if (dunia.luz.kapel) dunia.luz.kapel.intensity = state.glow * 70;
    if (dunia.luz.airMancur) dunia.luz.airMancur.intensity = state.glow * 18;

    for (const k of dunia.kaca) setEmissive(k.mat, k.min + (k.max - k.min) * state.glow);

    langit.uni.atas.value.copy(state.skyTop); langit.uni.bawah.value.copy(state.skyBottom);
    scene.fog.color.copy(state.skyBottom);
    langit.bintang.material.opacity = state.stars;
    langit.matAwan.color.copy(state.cloud);
    renderer.toneMappingExposure = state.exposure;
  }
  terapkan();

  function setMode(m) {
    mode = m;
    dari = salin(state); ke = parse(PRESET[m]); t = 0;
  }

  function update(dt) {
    if (t < 1) {
      t = Math.min(1, t + dt / DURASI);
      const e = t * t * (3 - 2 * t);
      ANGKA.forEach((k) => (state[k] = dari[k] + (ke[k] - dari[k]) * e));
      WARNA.forEach((k) => state[k].copy(dari[k]).lerp(ke[k], e));
      terapkan(); onChange();
    }
    for (const a of langit.awan) { a.position.x += a.userData.kec * dt; if (a.position.x > 260) a.position.x = -260; }
  }

  return {
    state, matahari, hemi,
    get mode() { return mode; },
    setMode, update,
    toggleMode() { setMode(mode === 'siang' ? 'malam' : 'siang'); return mode; },
    set onChange(fn) { onChange = fn; },

    setAngka(k, v) { t = 1; state[k] = v; terapkan(); },
    setWarna(k, hex) { t = 1; state[k].set(hex); terapkan(); },

    toggleLampu(group) {
      const l = dunia.lampu.find((x) => x.group === group);
      if (l) { l.on = !l.on; terapkan(); }
      return l ? l.on : null;
    },
    setSemuaLampu(on) { dunia.lampu.forEach((l) => (l.on = on)); terapkan(); },
    setKabut(on) { kabutAktif = on; scene.fog.far = on ? 260 : 100000; scene.fog.near = on ? 80 : 99999; },
    get kabut() { return kabutAktif; },
    setBayangan(on) { renderer.shadowMap.enabled = on; },
  };
}
