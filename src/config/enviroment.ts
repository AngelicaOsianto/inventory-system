// src/config/environment.ts

// Pastikan variabel lingkungan (dari .env) sudah dimuat oleh dotenv di app.ts
// Kita mendefinisikan variabel yang dibutuhkan aplikasi di sini.

// Wajib: Nilai rahasia JWT dan durasi (sesuai spesifikasi tugas)
export const JWT_SECRET: string = process.env.JWT_SECRET || 'fallback_secret_must_be_changed';
export const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';

// Durasi Token (sesuai spesifikasi tugas)
export const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m'; // 15 menit
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';  // 7 hari
export const PORT = process.env.PORT || 3000;