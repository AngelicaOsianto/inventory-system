// src/controllers/auth.controller.ts
import { Request, Response } from 'express';

// Logika ini akan diisi di langkah implementasi JWT dan bcrypt
export const registerUser = (req: Request, res: Response) => {
    res.status(501).json({ message: 'Register logic not implemented yet.' });
};

export const loginUser = (req: Request, res: Response) => {
    res.status(501).json({ message: 'Login logic not implemented yet.' });
};

export const getProfile = (req: Request, res: Response) => {
    res.status(501).json({ message: 'Profile logic not implemented yet.' });
};

export const refreshToken = (req: Request, res: Response) => {
    res.status(501).json({ message: 'Refresh token logic not implemented yet.' });
};