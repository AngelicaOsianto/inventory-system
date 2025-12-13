import { prisma } from '../config/database.js';
import { successResponse } from '../utils/response.js';


/**
 * GET ALL PRODUCTS
 * USER and ADMIN
 */
export const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET PRODUCT BY ID
 * USER and ADMIN
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        supplier: true,
        owner: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * CREATE PRODUCT
 * ADMIN ONLY
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, categoryId, supplierId } = req.body;

    if (!name || price == null || quantity == null || !categoryId || !supplierId) {
      return res.status(400).json({
        message: 'name, price, quantity, categoryId, supplierId are required',
      });
    }

    // ownerId diambil dari TOKEN
    const ownerId = req.user.id;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        categoryId: Number(categoryId),
        supplierId: Number(supplierId),
        ownerId: Number(ownerId),
      },
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE PRODUCT
 * ADMIN ONLY
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE PRODUCT
 * ADMIN ONLY
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
