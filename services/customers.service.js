const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include:[
        {
          association: 'user',
          attributes: {exclude: ['password']}
        }
      ]
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data) {
    const customer = await models.Customer.create(data, {
      include: ['user']
    });
    return customer;
  }

}

module.exports = CustomerService;