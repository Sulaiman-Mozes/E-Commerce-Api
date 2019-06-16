/* eslint-disable camelcase */
const models = require('../../models');


module.exports = {
  create: async (req, res) => {
    try {
      const { customer_id, total_amount, status } = req.body;
      const order = await models.Order.create({ customer_id, total_amount, status });
      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  getById: async (req, res) => {
    const { order_id } = req.params;
    const id = parseInt(order_id, 10);
    try {
      const data = await models.Order.findByPk(id);
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'ORD_02',
            message: "Don't exist order with this ID",
          },
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({
        error: {
          status: 400,
          code: 'ORD_01',
          message: 'The ID is not a number.',
        },
      });
    }
  },
  getByCustomer: async (req, res) => {
    try {
      const { customer_id } = req.body;
      const order = await models.Order.findAll({ where: { customer_id } });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  getOrderInfo: async (req, res) => {
    try {
      const { order_id } = req.body;
      const order = await models.OrderDetail.findOne({ where: { order_id } });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
};
