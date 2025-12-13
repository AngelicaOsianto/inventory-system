import Joi from 'joi';

export const supplierSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  contact: Joi.string().allow(null, ''),
});
