import express from 'express';
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplier.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { supplierSchema } from '../validators/supplier.validator.js';

const router = express.Router();

// Public
router.get('/', getSuppliers);
router.get('/:id', getSupplierById);

// Protected (ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(supplierSchema),
  createSupplier
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(supplierSchema),
  updateSupplier
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  deleteSupplier
);

export default router;
