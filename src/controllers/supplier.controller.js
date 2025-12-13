import { prisma } from '../config/database.js';
import { successResponse } from '../utils/response.js';

export const getSuppliers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const take = Math.min(parseInt(limit), 50);
    const skip = (page - 1) * take;

    const where = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {};

    const [suppliers, total] = await Promise.all([
      prisma.supplier.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.supplier.count({ where }),
    ]);

    return successResponse(res, {
      message: 'Supplier list retrieved',
      data: suppliers,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSupplierById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found',
      });
    }

    return successResponse(res, {
      message: 'Supplier detail retrieved',
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};


export const createSupplier = async (req, res, next) => {
  try {
    const { name, contact } = req.body;

    const supplier = await prisma.supplier.create({
      data: { name, contact },
    });

    return res.status(201).json({
      success: true,
      message: 'Supplier created',
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};


export const updateSupplier = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, contact } = req.body;

    const supplier = await prisma.supplier.update({
      where: { id },
      data: { name, contact },
    });

    return successResponse(res, {
      message: 'Supplier updated',
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteSupplier = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await prisma.supplier.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
