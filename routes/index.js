const express = require('express');

const productsRouter = require('./products.router');
const customerRouter = require('./customers.router');
const orderRouter = require('./orders.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/products', productsRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
