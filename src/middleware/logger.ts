// src/middleware/logger.ts
import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Console log info request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
};