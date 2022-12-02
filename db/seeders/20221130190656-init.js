'use strict';

const { PRODUCT_TABLE } = require('./../models/product.model');

module.exports = {
  async up (queryInterface, Sequelize) {
      
      const products = [
        {
          code: "PANTS",
          name: "Pants",
          price: 5.00,
          created_at: new Date()
        },
        {
          code: "TSHIRT",
          name: "T-Shirt",
          price: 20.00,
          created_at: new Date()
        },
        {
          code: "HAT",
          name: "Hat",
          price: 7.50,
          created_at: new Date()
        }
      ];
      await queryInterface.bulkInsert(PRODUCT_TABLE, products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
};
