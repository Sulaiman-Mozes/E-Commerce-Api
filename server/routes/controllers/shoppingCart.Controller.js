/* eslint-disable camelcase */
const stringGenerator = require('randomstring');
const models = require('../../models');

module.exports = {
  generateCartId: async (req, res) => {
    try {
      let str = stringGenerator.generate(18);
      let cart = await models.ShoppingCart.findOne({ where: { cart_id: str } });
      while (cart) {
        str = stringGenerator.generate(18);
        // eslint-disable-next-line no-await-in-loop
        cart = await models.ShoppingCart.findOne({ where: { cart_id: str } });
      }
      return res.status(200).json({ cart_id: str });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  addProduct: async (req, res) => {
    try {
      const { cart_id, product_id, attributes } = req.body;
      const newcCartProduct = await models.ShoppingCart.findOrCreate({
        defaults: { attributes, quantity: 1 },
        where: { cart_id, product_id },
      });
      const status = newcCartProduct[1];

      if (status === false) {
        const cart = newcCartProduct[0];
        const newQuantity = cart.quantity + 1;
        await cart.update({ quantity: newQuantity });
      }
      const data = await models.ShoppingCart.findAll({ where: { cart_id, buy_now: true } });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  listProducts: async (req, res) => {
    try {
      const { cart_id } = req.params;
      const data = await models.ShoppingCart.findAll({ where: { cart_id, buy_now: true } });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  updateCartProducts: async (req, res) => {
    const { item_id } = req.params;
    const { quantity } = req.body;
    const id = parseInt(item_id, 10);
    try {
      const product = await models.ShoppingCart.findByPk(id);
      if (!product) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'SHO_01',
            message: "Don't exist item with this ID",
          },
        });
      }
      await product.update({ quantity });
      const data = await models.ShoppingCart.findAll({
        where: { cart_id: product.cart_id, buy_now: true },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
          error,
        },
      });
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { cart_id } = req.params;
      const data = await models.ShoppingCart.destroy({ where: { cart_id } });
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'SHO_01',
            message: "Don't exist shopping cart with this ID",
          },
        });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
          error,
        },
      });
    }
  },
  moveToCart: async (req, res) => {
    const { item_id } = req.params;
    const id = parseInt(item_id, 10);
    try {
      const product = await models.ShoppingCart.findByPk(id);
      if (!product) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'SHO_01',
            message: "Don't exist item with this ID",
          },
        });
      }
      const item = await product.update({ buy_now: true });
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
          error,
        },
      });
    }
  },
  totalCartAmount: async (req, res) => {
    try {
      const { cart_id } = req.params;
      const data = await models.ShoppingCart.findAll({
        include: [{ model: models.Product }],
        where: { cart_id, buy_now: true },
      });
      const getSum = (total, item) => total + (item.quantity * parseFloat(item.Product.price));
      const totalAmount = data.reduce(getSum, 0);
      return res.status(200).json({ total_amount: data.length > 0 ? totalAmount : null });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
          error,
        },
      });
    }
  },
  saveForLater: async (req, res) => {
    const { item_id } = req.params;
    const id = parseInt(item_id, 10);
    try {
      const product = await models.ShoppingCart.findByPk(id);
      if (!product) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'SHO_01',
            message: "Don't exist item with this ID",
          },
        });
      }
      const item = await product.update({ buy_now: false });
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
          error,
        },
      });
    }
  },
  getSavedForLater: async (req, res) => {
    try {
      const { cart_id } = req.params;
      const data = await models.ShoppingCart.findAll({ where: { cart_id, buy_now: false } });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  removeProduct: async (req, res) => {
    try {
      const { item_id } = req.params;
      const item = await models.ShoppingCart.findOne({ where: { item_id } });
      if (!item) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'SHO_01',
            message: "Don't exist item with this ID",
          },
        });
      }
      await item.destroy();
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
          error,
        },
      });
    }
  },
};
