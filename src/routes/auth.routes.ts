import { Router } from 'express';
import { 
    registerUser, 
    loginUser, 
    getProfile, 
    refreshToken 
} from '../controllers/auth.controller.js'; // <-- Akan dibuat di langkah 3
import { isAuthenticated } from '../middleware/auth.js'; // <-- Akan dibuat di langkah 5

const router = Router();

// Endpoint Tidak Memerlukan Autentikasi
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);

// Endpoint Memerlukan Autentikasi
// Middleware isAuthenticated akan berjalan sebelum getProfile
router.get('/me', isAuthenticated, getProfile);

export default router;