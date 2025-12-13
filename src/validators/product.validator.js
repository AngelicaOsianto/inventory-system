import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
  categoryId: Joi.number().integer().required(),
  supplierId: Joi.number().integer().required()
});
