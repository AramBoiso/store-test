const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
//   allProductsAmount:{
//     type: DataTypes.VIRTUAL,
//     get(){
//         if(this.items.length > 0){
//             return this.items.reduce((allProductsAmount, item) => {
//               return allProductsAmount + item.OrderProduct.amount
//             }, 0);
//         }
//         return 0;
//     }
//   },
//   test: {
//     type: DataTypes.VIRTUAL,
//     get(){
//         return this.allProductsAmount
//     }
//   }
//   total: {
//     type: DataTypes.VIRTUAL,
//     get() {
//       if (this.items.length > 0) {
//         return this.items.reduce((total, item) => {
//           return total + (item.price * item.OrderProduct.amount);
//         }, 0);
//       }
//       return 0;
//     }
//   }
}


class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };