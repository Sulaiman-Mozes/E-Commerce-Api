/* eslint-disable camelcase */
const models = require('../../models');

module.exports = {
  allAttributes: async (req, res) => {
    const { limit } = req.query;
    try {
      const data = await models.Attribute.findAndCountAll({ order: [['attribute_id']], limit });
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

  attributeByID: async (req, res) => {
    const { attribute_id } = req.params;
    const id = parseInt(attribute_id, 10);
    try {
      const data = await models.Attribute.findByPk(id);
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'ATTR_01',
            message: "Don't exist attribute with this ID",
          },
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({
        error: {
          status: 400,
          code: 'ATTR_02',
          message: 'The ID is not a number.',
        },
      });
    }
  },

  attributeByProduct: async (req, res) => {
    const { product_id } = req.params;
    try {
      const data = await models.Product.findAll({
        where: { product_id },
        include: [{
          model: models.AttributeValue,
          as: 'product_attribute',
        }],
      });
      return res.status(200).json(data.length > 0 ? data[0].product_attribute : []);
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

  attributeValues: async (req, res) => {
    const { attribute_id } = req.params;
    try {
      const data = await models.AttributeValue.findAll({ where: { attribute_id } });
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
};
