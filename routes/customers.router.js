const express = require('express');
const passport = require('passport');

const CustomerService = require('../services/customers.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/profile',
 passport.authenticate('jwt', {session: false}),
 async (req, res, next) => {
  try {
    const customerId = req.user.sub;
    res.json(await service.findOne(customerId));
  } catch (error) {
    next(error);
  }
});

router.post('/',
validationHandler(createCustomerSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body));
  } catch (error) {
    next(error);
  }
}
);

module.exports = router;