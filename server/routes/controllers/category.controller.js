/* eslint-disable camelcase */
const models = require('../../models');

module.exports = {
  allCategories: async (req, res) => {
    const { limit } = req.query;
    try {
      const data = await models.Category.findAndCountAll({ order: [['category_id']], limit });
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

  categoryByID: async (req, res) => {
    const { category_id } = req.params;
    try {
      const data = await models.Category.findByPk(category_id);
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'CAT_01',
            message: "Don't exist category with this ID",
          },
        });
      }
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

  categoryByProduct: async (req, res) => {
    const { product_id } = req.params;
    try {
      const data = await models.Product.findByPk(
        product_id,
        {
          include: [{
            model: models.Category,
            as: 'product_category',
            attributes: ['category_id', 'name', 'department_id'],
          }],
        },
      );
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'PRO_01',
            message: "Don't exist product with this ID",
          },
        });
      }
      return res.status(200).json(data.product_category);
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

  categoryByDepartment: async (req, res) => {
    const { department_id } = req.params;
    try {
      const data = await models.Category.findAll({ where: { department_id } });
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
