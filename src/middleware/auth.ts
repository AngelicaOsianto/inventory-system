// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

// Middleware ini akan diisi logika JWT verification nanti
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Saat ini, cukup panggil next() agar route bisa diakses (sementara)
    // Nanti, ganti dengan logika JWT
    next();
};