import * as dotenv from 'dotenv';
dotenv.config(); 

import express, { Application, Request, Response, NextFunction } from 'express';
import { loggerMiddleware } from './middleware/logger.js';      // <-- Akan dibuat di langkah 5
import { errorHandler } from './middleware/errorHandler.js';    // <-- Sudah dibuat/dibayangkan
import authRouter from './routes/auth.routes';               // <-- Akan dibuat di langkah 2

const app: Application = express();
const port = process.env.PORT || 3000;

// 1. MIDDLEWARE GLOBAL
app.use(loggerMiddleware); 
app.use(express.json()); // Body Parser untuk membaca JSON

// 2. HEALTH CHECK ENDPOINT (Wajib Proyek Akhir)
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'API is running' });
});

// 3. DEFINISI ROUTES
app.use('/api/auth', authRouter);

// 4. ERROR HANDLER (Harus paling akhir)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});