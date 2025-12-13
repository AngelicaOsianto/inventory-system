import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// PUBLIC
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// ADMIN ONLY
router.post('/', authMiddleware, requireAdmin, createCategory);
router.put('/:id', authMiddleware, requireAdmin, updateCategory);
router.delete('/:id', authMiddleware, requireAdmin, deleteCategory);

export default router;
