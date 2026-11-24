# Trinity General School — Teras Tea Party (Dunia 3D Interaktif)

Tugas 3 (kelompok) mata kuliah **Komputer Grafik (IF38022)**.
Dunia 3D kecil yang berjalan di browser, dibuat dengan **Three.js r160** (WebGL), bertema halaman dalam
Trinity General School dari Blue Archive: kapel gotik, plaza marmer, air mancur, taman mawar, dan meja teh.
Semua model dirakit dari bentuk dasar Three.js; tidak ada aset resmi game yang dipakai.

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
