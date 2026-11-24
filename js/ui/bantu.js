export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const hex = (c) => '#' + c.getHexString();

export function baris(induk, { label, min, max, step, nilai = 0, fmt = (v) => v.toFixed(2), onInput }) {
  const el = document.createElement('label');
  el.className = 'slider';
  el.innerHTML = `<span>${label}</span><output></output><input type="range" min="${min}" max="${max}" step="${step}">`;
  const inp = $('input', el), out = $('output', el);
  const tampil = (v) => { out.textContent = fmt(+v); };
  inp.addEventListener('input', () => { tampil(inp.value); onInput(+inp.value); });
  inp.value = nilai; tampil(nilai);
  induk.append(el);
  return { set(v) { inp.value = v; tampil(v); }, aktif(b) { inp.disabled = !b; }, inp };
}
export function barisWarna(induk, label, onInput) {
  const el = document.createElement('label');
  el.className = 'warna';
  el.innerHTML = `<span>${label}</span><input type="color">`;
  const inp = $('input', el);
  inp.addEventListener('input', () => onInput(inp.value));
  induk.append(el);
  return { set(v) { inp.value = v; } };
}
export const sub = (induk, t) => { const h = document.createElement('h3'); h.textContent = t; induk.append(h); };
export const wrap180 = (d) => ((d + 180) % 360 + 360) % 360 - 180;
