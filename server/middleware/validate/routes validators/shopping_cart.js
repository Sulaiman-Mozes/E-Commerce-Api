/* eslint-disable camelcase */
const models = require('../../../models');
const helpers = require('../../commons');

module.exports = {
  create: async (req, res, next) => {
    const { cart_id, product_id, attributes } = req.body;
    if (!cart_id || !product_id || !attributes) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'SHO_03',
          message: 'All fields are required',
          field: 'cart_id, product_id, attributes',
        },
      });
    }
    if (!helpers.isPositiveInteger(product_id)) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'SHO_04',
          message: 'Product Id should be an interger',
          field: 'product_id',
        },
      });
    }
    const product = await models.Product.findByPk(product_id);
    if (!product) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'SHO_02',
          message: "Doesn't exist product with this ID",
          field: 'product_id',
        },
      });
    }
    return next();
  },

  update: async (req, res, next) => {
    const { quantity } = req.body;

    if (!quantity || !helpers.isPositiveInteger(quantity)) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'SHO_03',
          message: 'All fields are required and Quantity Should be an Integer',
          field: 'quantity',
        },
      });
    }
    return next();
  },

  itemId: async (req, res, next) => {
    const { item_id } = req.params;

    if (!helpers.isPositiveInteger(item_id)) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'SHO_04',
          message: 'Item Id should be an interger',
          field: 'item_id',
        },
      });
    }
    return next();
  },

  cartId: async (req, res, next) => {
    const { cart_id } = req.params;

    if (typeof cart_id !== 'string' || cart_id.length !== 18) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'SHO_06',
          message: 'cart Id is Invalid',
          field: 'cart_id',
        },
      });
    }
    return next();
  },
};
