import { PI } from '../objek/bantu.js';
import { buatMeja } from '../objek/meja.js';
import { buatKursi } from '../objek/kursi.js';
import { buatKue } from '../objek/kue.js';
import { buatTeko } from '../objek/teko.js';
import { buatCangkir } from '../objek/cangkir.js';
import { buatBangku } from '../objek/bangku.js';

export function tempatkanSetTeh(ctx, daftar) {
  const MEJA = { x: 7.6, z: 3.6 };
  daftar('meja', 'Meja Teh Bundar', buatMeja(ctx), MEJA.x, MEJA.z);
  for (let i = 0; i < 4; i++) {
    const a = i * PI / 2 + 0.55;
    daftar(`kursi${i + 1}`, `Kursi Taman ${i + 1}`, buatKursi(ctx), MEJA.x + Math.sin(a) * 1.75, MEJA.z + Math.cos(a) * 1.75, a + PI);
  }
  daftar('kue', 'Kue Bertingkat', buatKue(ctx), MEJA.x + 0.2, MEJA.z + 0.1, 0, 0.81);
  daftar('teko', 'Teko Teh', buatTeko(ctx), MEJA.x - 0.5, MEJA.z - 0.2, 0.6, 0.81);
  daftar('cangkir1', 'Cangkir Teh 1', buatCangkir(ctx), MEJA.x + 0.62, MEJA.z + 0.62, 0.7, 0.81);
  daftar('cangkir2', 'Cangkir Teh 2', buatCangkir(ctx), MEJA.x - 0.62, MEJA.z - 0.66, 3.8, 0.81);

  daftar('bangku1', 'Bangku Taman 1', buatBangku(ctx), -9.1, 2.0, PI / 2);
  daftar('bangku2', 'Bangku Taman 2', buatBangku(ctx), -9.1, 6.8, PI / 2);
}
