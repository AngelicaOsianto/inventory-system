import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Auth middleware works!',
    user: req.user,
  });
});

export default router;
