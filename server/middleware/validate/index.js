const shoppingCart = require('./routes validators/shopping_cart');
const department = require('./routes validators/department');
const category = require('./routes validators/category');
const product = require('./routes validators/product');

module.exports = {
  shoppingCart,
  department,
  category,
  product,
};
