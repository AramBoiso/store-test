const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async find() {
    const user = await models.User;
    const response = await user.findAll({
      include: ['customer']
    });

    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if(!user){
      throw boom.notFound('user not found');
    }

    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {email},
      include: ['customer']
    });

    if(!user){
      throw boom.notFound('user not found');
    }

    return user;
  }

}

module.exports = UserService;
