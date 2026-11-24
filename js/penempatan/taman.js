import { buatLampu } from '../objek/lampu.js';
import { buatAirMancur } from '../objek/airmancur.js';
import { buatMawar } from '../objek/mawar.js';
import { buatPohon } from '../objek/pohon.js';
import { buatPapanFoto } from '../objek/papanfoto.js';

export function tempatkanTaman(ctx, daftar) {
  daftar('lampu1', 'Lampu Taman 1', buatLampu(ctx, 'lampu1'), -2.8, 9);
  daftar('lampu2', 'Lampu Taman 2', buatLampu(ctx, 'lampu2'), 2.8, 9);
  daftar('lampu3', 'Lampu Taman 3', buatLampu(ctx, 'lampu3'), 4.6, 7.0);
  daftar('lampu4', 'Lampu Taman 4', buatLampu(ctx, 'lampu4'), -10.6, 4.4);

  daftar('airmancur', 'Air Mancur', buatAirMancur(ctx), 0, 3);
  daftar('mawar1', 'Semak Mawar 1', buatMawar(ctx, 3), -3.6, -6.4);
  daftar('mawar2', 'Semak Mawar 2', buatMawar(ctx, 8), 3.6, -6.4);
  daftar('mawar3', 'Semak Mawar 3', buatMawar(ctx, 15), 11.8, -2.4);
  daftar('pohon1', 'Pohon Sakura 1', buatPohon(4), -12.6, -3.2);
  daftar('pohon2', 'Pohon Sakura 2', buatPohon(9), 12.8, -6.8);
  daftar('pohon3', 'Pohon Sakura 3', buatPohon(13), -12.8, 8.6);
  daftar('papan', 'Papan Kenangan (Foto Anggota)', buatPapanFoto(ctx), -8.4, 10.6, 0.3);
}
