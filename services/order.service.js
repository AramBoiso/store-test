const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const ProductsService = require('./product.service');
const productsService = new ProductsService(); 

class OrderService {

  constructor(){}

  async find(customerId) {
    const orders = await models.Order.findAll({
      where: { customerId },
      include: ['items']
    });

    return orders;
  }

  async findOne(id, customerId) {
    console.log(`customerId --> ${customerId}`);
    const order = await models.Order.findOne({
      where: { id, customerId},
      include: [
        {
          association: 'customer',
        },
        'items'
      ]
    });

    if(!order)
      return boom.notFound('Order not found :(');
    return order;
  }

  async create(data, customerId) {
    let total = 0;
    let subtotal = 0;
    let product = null;

    let products = (await productsService.find())
      .map(product => ({...product.dataValues, amount: 0}));

    const order = await models.Order.create({customerId});
    
    for(let item of data.items){
      product = products.find(product => product.id == item.productId);
      product.amount += item.amount;

      await models.OrderProduct.create({
       ...item,
       orderId: order.id
      });
    }

    //Algoritm of discount
    for(let product of products){
      subtotal += product.price * product.amount;

      if(product.code == "PANTS"){
        
        total += (product.amount % 2 == 0)? 
          product.price * product.amount / 2 : 
          (product.price * (product.amount -1)/2) + product.price;
        continue;
      }

      if(product.code == "TSHIRT"){
        if(product.amount >= 3)
          total += (product.price * product.amount) - product.amount
          continue;
      }

      total += product.price * product.amount;

    }
   
    await order.update({
      subtotal,
      discount: subtotal - total,
      total
    });

    return {
      order
    };
  }

}

module.exports = OrderService;
