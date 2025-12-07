// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

// Definisi Interface untuk Error yang lebih spesifik (opsional tapi disarankan)
interface CustomError extends Error {
    status?: number;
}

/**
 * Middleware Error Handler
 * Wajib memiliki 4 parameter: (err, req, res, next)
 */
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    // 1. Tentukan status HTTP (default 500: Internal Server Error)
    const statusCode = err.status || 500;
    
    // 2. Log error untuk kebutuhan debugging (sesuai persyaratan tugas)
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.error('SERVER ERROR:', err.message, err.stack);
    
    // 3. Kirim response error standar (sesuai persyaratan tugas)
    // Di development, Anda bisa menyertakan detail error.
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Terjadi kesalahan pada server.'
        // Nanti, di production, Anda tidak boleh mengekspos stack trace.
    });
};