const express = require('express');
const authenticate = require('../middleware/authenticate');
const validator = require('../middleware/validate');

/** Import Controllers */
const categoryController = require('./controllers/category.controller');
const departmentController = require('./controllers/department.contoller');
const attributeController = require('./controllers/attribute.controller');
const taxController = require('./controllers/tax.Controllers');
const shippingContoller = require('./controllers/shipping.Controller');
const customerController = require('./controllers/customer.controller');
const orderController = require('./controllers/order.Controller');
const shoppingController = require('./controllers/shoppingCart.Controller');
const productController = require('./controllers/product.Controller');
const stripeController = require('./controllers/stripe.Controller');


const router = express.Router();

/** Department Endpoints */
router.get('/departments', departmentController.list);
router.get('/departments/:department_id', validator.department.Id, departmentController.get);

/** Categories Endpoints */
router.get('/categories', categoryController.allCategories);
router.get('/categories/:category_id', validator.category.Id, categoryController.categoryByID);
router.get('/categories/inProduct/:product_id', validator.product.Id, categoryController.categoryByProduct);
router.get('/categories/inDepartment/:department_id', validator.department.Id, categoryController.categoryByDepartment);

/** Attributes Endpoints */
router.get('/attributes', attributeController.allAttributes);
router.get('/attributes/:attribute_id', attributeController.attributeByID);
router.get('/attributes/values/:attribute_id', attributeController.attributeValues);
router.get('/attributes/inProduct/:product_id', validator.product.Id, attributeController.attributeByProduct);

/** Tax Endpoints */
router.get('/tax', taxController.list);
router.get('/tax/:tax_id', taxController.get);

/** Shipping Endpoints */
router.get('/shipping/regions', shippingContoller.list);
router.get('/shipping/regions/:shipping_region_id', shippingContoller.get);

/** Customers Endpoints */
router.post('/customers', customerController.register);
router.post('/customers/login', customerController.login);
router.post('/customers/facebook', customerController.socialAuth);
router.put('/customers/address', authenticate, customerController.address);
router.put('/customers/creditCard', authenticate, customerController.creditcard);
router.put('/customer', authenticate, customerController.profile);
router.get('/customer', authenticate, customerController.details);

/** Orders Endpoints */
router.post('/orders', authenticate, orderController.create);
router.get('/orders/:order_id', authenticate, orderController.getById);
router.get('/orders/inCustomer', authenticate, orderController.getByCustomer);
router.get('/orders/shortDetail/:order_id', authenticate, orderController.getOrderInfo);

/** Shopping Cart Endpoints */
router.get('/shoppingcart/generateUniqueId', shoppingController.generateCartId);
router.post('/shoppingcart/add', validator.shoppingCart.create, shoppingController.addProduct);
router.get('/shoppingcart/:cart_id', validator.shoppingCart.cartId, shoppingController.listProducts);
router.put('/shoppingcart/update/:item_id',
  [validator.shoppingCart.itemId, validator.shoppingCart.update],
  shoppingController.updateCartProducts);
router.delete('/shoppingcart/empty/:cart_id', shoppingController.deleteCart);
router.get('/shoppingcart/moveToCart/:item_id', validator.shoppingCart.itemId, shoppingController.moveToCart);
router.get('/shoppingcart/totalAmount/:cart_id', validator.shoppingCart.cartId, shoppingController.totalCartAmount);
router.get('/shoppingcart/saveForLater/:item_id', validator.shoppingCart.itemId, shoppingController.saveForLater);
router.get('/shoppingcart/getSaved/:cart_id', validator.shoppingCart.cartId, shoppingController.getSavedForLater);
router.delete('/shoppingcart/removeProduct/:item_id', validator.shoppingCart.itemId, shoppingController.removeProduct);

/** Products Endpoints */
router.get('/products', productController.listProducts);
router.get('/products/search', productController.searchProducts);
router.get('/products/:product_id', validator.product.Id, productController.getProductById);
router.get('/products/inCategory/:category_id', validator.category.Id, productController.getProductsByCategory);
router.get('/products/inDepartment/:department_id', validator.department.Id, productController.getProductsByDepartment);
router.get('/products/:product_id/details', validator.product.Id, productController.productDetails);
router.get('/products/:product_id/locations', validator.product.Id, productController.productLocations);
router.get('/products/:product_id/reviews', validator.product.Id, productController.productreviews);
router.post('/products/:product_id/reviews', authenticate, validator.product.Id, productController.addreview);

/** Stripe Endpoints */
router.post('/stripe/charge', stripeController.charge);


module.exports = router;
