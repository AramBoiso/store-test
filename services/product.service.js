const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){}

  async find() {
    const products = await models.Product.findAll();
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);

    if (!product) {
      throw boom.notFound('Product not found :(');
    }
    
    return product;
  }

}

module.exports = ProductsService;
