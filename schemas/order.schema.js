const Joi = require('joi');

const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const id = Joi.number().integer();

const item = Joi.object({
  productId: productId.required(),
  amount: amount.required()
});

const createOrderSchema = Joi.object({
  items: Joi.array().items(item)
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { getOrderSchema, createOrderSchema };