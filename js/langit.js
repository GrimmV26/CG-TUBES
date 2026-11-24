import * as THREE from 'three';
import { rng } from './textures.js';

export function buatLangit(scene) {
  const uni = { atas: { value: new THREE.Color() }, bawah: { value: new THREE.Color() } };
  const kubah = new THREE.Mesh(
    new THREE.SphereGeometry(400, 32, 20),
    new THREE.ShaderMaterial({
      uniforms: uni, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: `
        varying vec3 vP;
        void main() {
          vP = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 atas;
        uniform vec3 bawah;
        varying vec3 vP;
        void main() {
          float h = clamp(vP.y * 1.25 + 0.04, 0.0, 1.0);
          gl_FragColor = vec4(mix(bawah, atas, pow(h, 0.55)), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    }),
  );
  kubah.renderOrder = -10; kubah.userData.tanpaShading = true;
  scene.add(kubah);

  const r = rng(5), n = 1800, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, e = Math.asin(0.05 + r() * 0.95);
    pos[i * 3] = Math.cos(a) * Math.cos(e) * 380; pos[i * 3 + 1] = Math.sin(e) * 380; pos[i * 3 + 2] = Math.sin(a) * Math.cos(e) * 380;
  }
  const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const bintang = new THREE.Points(bg, new THREE.PointsMaterial({ color: 0xffffff, size: 1.7, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false }));
  bintang.raycast = () => {}; bintang.frustumCulled = false;
  scene.add(bintang);

  const cakram = new THREE.Mesh(new THREE.SphereGeometry(13, 24, 16), new THREE.MeshBasicMaterial({ color: 0xfff4c2, fog: false }));
  cakram.userData.tanpaShading = true; cakram.raycast = () => {};
  scene.add(cakram);

  const awan = [], matAwan = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
  const ra = rng(19);
  for (let i = 0; i < 9; i++) {
    const g = new THREE.Group();
    for (let k = 0; k < 5; k++) {
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(7 + ra() * 6, 1), matAwan);
      m.position.set((k - 2) * 9 + ra() * 4, ra() * 3, ra() * 6); m.scale.y = 0.55; m.userData.tanpaShading = true;
      g.add(m);
    }
    const a = ra() * Math.PI * 2, rad = 110 + ra() * 120;
    g.position.set(Math.cos(a) * rad, 55 + ra() * 35, Math.sin(a) * rad - 40);
    g.userData.kec = 1.2 + ra() * 1.5;
    scene.add(g); awan.push(g);
  }
  return { uni, bintang, cakram, awan, matAwan };
}
