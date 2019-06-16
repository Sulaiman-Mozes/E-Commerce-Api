/* eslint-disable camelcase */
const models = require('../../models');

module.exports = {
  list: async (req, res) => {
    const { limit } = req.query;
    try {
      const data = await models.ShippingRegion.findAndCountAll({ order: [['shipping_region_id']], limit });
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

  get: async (req, res) => {
    const { shipping_region_id } = req.params;
    try {
      const data = await models.Shipping.findAll({ where: { shipping_region_id } });
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
};
