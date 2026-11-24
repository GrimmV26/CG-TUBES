# Trinity General School — Teras Tea Party (Dunia 3D Interaktif)

Tugas 3 (kelompok) mata kuliah **Komputer Grafik (IF38022)**.
Dunia 3D kecil yang berjalan di browser, dibuat dengan **Three.js r160** (WebGL), bertema halaman dalam
Trinity General School dari Blue Archive: kapel gotik, plaza marmer, air mancur, taman mawar, dan meja teh.
Semua model dirakit dari bentuk dasar Three.js; tidak ada aset resmi game yang dipakai.


## Cara menjalankan

Halaman memakai modul JavaScript, jadi **tidak bisa** dibuka dengan klik dua kali `index.html`. Pilih salah satu:

```bash
# Python (sudah ada di kebanyakan komputer)
python -m http.server 8000      # lalu buka http://localhost:8000

# atau Node.js
npx serve .
```
atau pakai ekstensi **Live Server** di VS Code (klik kanan `index.html` → *Open with Live Server*).
Three.js sudah disimpan lokal di `libs/`, jadi tidak butuh internet.

## Kontrol

| Aksi | Cara |
| --- | --- |
| Putar / geser / zoom kamera | klik kiri + seret / klik kanan + seret / scroll |
| Pilih benda | klik benda di adegan, atau pilih dari daftar di panel |
| Pindah / putar / skala dengan mouse | seret gizmo; tombol **W** (geser), **E** (putar), **R** (skala) |
| Pindah / putar / skala dengan angka | slider Posisi, Rotasi, Skala dan tombol cepat di panel |
| Sudut pandang tetap | tombol *Tampak depan*, *Tampak atas*, *Bebas* |
| Proyeksi | *Perspektif* / *Ortografik*, slider FOV |
| Cahaya | slider intensitas & warna, elevasi & azimut, tombol *Siang* / *Malam* |
| Shading | Standar, Phong, Flat, Toon, Kerangka (wireframe) |
| Lampu taman / air mancur | klik ganda untuk nyala-mati |
| Batal pilih | **Esc** |

## Pemetaan syarat tugas → kode

| Syarat | Dipenuhi oleh | Berkas |
| --- | --- | --- |
| ≥ 5 benda 3D + lantai + dinding/batas | 23 benda interaktif, lantai marmer, dinding & pagar | `js/objek/*.js` (benda), `js/latar/*.js` (lantai, dinding, pagar, kapel), dirangkai di `js/objects.js` |
| Posisi, rotasi, skala (button atau mouse) | `TransformControls` + slider + tombol | `js/interaction.js`, `js/ui/objek.js` |
| Kamera orbit (OrbitControls) | rotasi & zoom mouse | `js/camera.js` |
| 2 tombol sudut pandang tetap | Tampak depan, Tampak atas | `js/camera.js` (`SUDUT`), `js/ui/kamera.js` |
| Slider intensitas & warna cahaya | cahaya utama, ambient, lampu taman | `js/lighting.js`, `js/ui/cahaya.js` |
| Tombol siang/malam | transisi halus ke preset | `js/lighting.js` (`PRESET`) |
| ≥ 1 tekstur foto anggota | Papan Kenangan | `js/tekstur/foto.js` (`muatFoto`), `js/objek/papanfoto.js` (`buatPapanFoto`), `js/config.js` |

Tambahan di luar syarat: proyeksi ortografik, 5 mode shading, bayangan, kabut, interaksi klik ganda.

## Struktur proyek

```
index.html            halaman + panel kontrol
css/style.css         tampilan panel
js/config.js          <- EDIT: nama kelompok, anggota, nama file foto
js/main.js            titik masuk, renderer, loop animasi
js/objects.js         perangkai dunia: memanggil latar + penempatan
js/objek/             SATU FILE PER BENDA interaktif (lihat tabel di bawah)
js/objek/bantu.js     fungsi pembantu bersama (M, B, UV, lengkung gotik)
js/objek/bahan.js     material bersama (batu, emas, besi, porselen, ...)
js/latar/             latar statis: tanah, plaza, dinding, pagar, sayap, kapel, bunga, hutan
js/penempatan/        posisi awal benda: set-teh.js, taman.js
js/textures.js        pintu masuk tekstur (hanya meneruskan ke js/tekstur/)
js/tekstur/           tekstur prosedural (canvas) + foto: dasar, bangunan, set-teh, kaca-kapel, foto
js/interaction.js     pilih benda, gizmo, slider/tombol transformasi
js/camera.js          kamera perspektif/ortografik, OrbitControls, sudut tetap
js/lighting.js        cahaya matahari/bulan, ambient, lampu, siang/malam
js/langit.js          langit: kubah gradasi, bintang, matahari/bulan, awan
js/shading.js         pergantian mode shading
js/ui.js              rangka panel HTML (judul, buka/tutup, memanggil js/ui/)
js/ui/                bagian panel: kamera, cahaya, objek (+ bantu.js)
libs/three/           Three.js r160 (MIT) + OrbitControls + TransformControls
assets/foto/          foto anggota (placeholder — GANTI)
docs/screenshots/     tangkapan layar untuk laporan
```

### Peta benda → berkas

| id objek (di panel) | Berkas | Fungsi |
| --- | --- | --- |
| `meja` | `js/objek/meja.js` | `buatMeja` |
| `kursi1`–`kursi4` | `js/objek/kursi.js` | `buatKursi` |
| `kue` | `js/objek/kue.js` | `buatKue` |
| `teko` | `js/objek/teko.js` | `buatTeko` |
| `cangkir1`, `cangkir2` | `js/objek/cangkir.js` | `buatCangkir` |
| `lampu1`–`lampu4` | `js/objek/lampu.js` | `buatLampu` |
| `airmancur` | `js/objek/airmancur.js` | `buatAirMancur` |
| `mawar1`–`mawar3` | `js/objek/mawar.js` | `buatMawar` |
| `bangku1`, `bangku2` | `js/objek/bangku.js` | `buatBangku` |
| `pohon1`–`pohon3` | `js/objek/pohon.js` | `buatPohon` |
| `papan` | `js/objek/papanfoto.js` | `buatPapanFoto` |

Latar statis (tidak bisa dipilih): `js/latar/tanah.js`, `plaza.js`, `dinding.js`, `pagar.js`, `sayap.js`, `kapel.js`, `bunga.js`, `hutan.js`.

**Menambah benda baru:** buat `js/objek/<nama>.js` yang mengekspor `buatXxx(ctx)` dan mengembalikan `THREE.Group`
(titik asal = pusat dasar benda), impor di `js/penempatan/set-teh.js` atau `taman.js`, lalu daftarkan dengan
`daftar('id', 'Nama di panel', buatXxx(ctx), x, z)`. `ctx` berisi material bersama (`ctx.mat`) dan daftar lampu/kaca/foto.
Untuk memindahkan posisi awal benda, cukup ubah angka x / z di file penempatan.

## Pembagian kerja per file (3 anggota)

Satu file = satu pemilik. Perubahan di file orang lain lewat Pull Request atau minta pemiliknya.

| | Anggota 1: Dunia & kamera | Anggota 2: Set teh & interaksi | Anggota 3: Taman & cahaya |
| --- | --- | --- | --- |
| Benda | semua `js/latar/*` | `meja`, `kursi`, `kue`, `teko`, `cangkir`, `bangku` | `lampu`, `airmancur`, `mawar`, `pohon`, `papanfoto` |
| Sistem | `camera.js`, `objects.js`, `langit.js`, `objek/bantu.js`, `objek/bahan.js` | `interaction.js`, `shading.js`, `main.js` | `lighting.js`, `config.js` |
| Panel | `ui.js`, `ui/bantu.js`, `ui/kamera.js` | `ui/objek.js` | `ui/cahaya.js` |
| Tekstur | `tekstur/bangunan.js` | `textures.js`, `tekstur/dasar.js`, `set-teh.js`, `kaca-kapel.js` | `tekstur/foto.js` |
| Lainnya | | `penempatan/set-teh.js` | `penempatan/taman.js`, `index.html`, `css/style.css`, `README.md` |

## Mengganti foto anggota

1. Simpan foto asli di `assets/foto/` (JPG atau PNG, rasio bebas; otomatis di-crop ke bingkai 3:4).
2. Sesuaikan nama file dan nama anggota di `js/config.js`:
   ```js
   export const ANGGOTA = [
     { nama: 'Budi Santoso', foto: 'assets/foto/budi.jpg' },
     // ...
   ];
   ```
3. Muat ulang halaman. Jika file tidak ditemukan, papan memakai gambar pengganti dan konsol browser menampilkan peringatan.

## Mengunggah ke GitHub & membuat website

1. Buat repositori baru di GitHub (mis. `trinity-3d-world`), lalu di folder proyek:
   ```bash
   git init
   git add .
   git commit -m "Dunia 3D Trinity: versi awal"
   git branch -M main
   git remote add origin https://github.com/<username>/trinity-3d-world.git
   git push -u origin main
   ```
2. **Dosen sebagai kolaborator:** repositori → *Settings* → *Collaborators* → *Add people* → isi username GitHub dosen.
3. **Website:** repositori → *Settings* → *Pages* → *Build and deployment* → *Deploy from a branch* → `main` / `(root)` → *Save*.
   Alamatnya akan muncul sekitar 1–2 menit kemudian: `https://<username>.github.io/trinity-3d-world/`.
4. **Kontribusi tiap anggota dinilai.** Setiap anggota sebaiknya meng-*clone* repositori, bekerja di berkas bagiannya, dan
   *commit* dari akunnya sendiri (`git config user.name` dan `user.email` harus sesuai akun GitHub masing-masing).
   Kode sudah dipisah per modul supaya pembagian kerja mudah; contoh pembagian ada di laporan.

## Catatan teknis

- Dibutuhkan browser dengan **WebGL2** (Chrome, Edge, Firefox, Safari terbaru).
- Three.js r160 berlisensi MIT (`libs/three/LICENSE`).
- Untuk pengujian, objek `window.__dunia` tersedia di konsol browser (scene, kamera, cahaya, daftar objek).
