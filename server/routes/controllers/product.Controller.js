/* eslint-disable camelcase */
const models = require('../../models');


module.exports = {
  listProducts: async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await models.Product.findAndCountAll({ limit: limit || 20 });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  searchProducts: (req, res) => { },
  getProductById: async (req, res) => {
    const { product_id } = req.query;
    try {
      const data = await models.Product.findByPk(product_id);
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'PROD_01',
            message: "Don't exist product with this ID",
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
  getProductsByCategory: async (req, res) => {
    const { category_id } = req.params;
    try {
      const data = await models.Category.findByPk(
        category_id,
        {
          include: [{
            model: models.Product,
            as: 'product_category',
          }],
        },
      );
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
        },
      });
    }
  },
  getProductsByDepartment: async (req, res) => {
    const { department_id } = req.params;
    try {
      const data = await models.Category.findAndCountAll(
        {
          where: { department_id },
          include: [{
            model: models.Product,
            as: 'product_category',
          }],
        },
      );
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
  productDetails: (req, res) => { },
  productLocations: async (req, res) => {
    const { product_id } = req.params;
    try {
      const data = await models.Product.findByPk(
        product_id,
        {
          include: [{
            model: models.Category,
            as: 'product_category',
            attributes: ['category_id', 'name', 'department_id'],
            include: [{
              model: models.Department,
            }],
          }],
        },
      );
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'PROD_01',
            message: "Don't exist product with this ID",
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
  productreviews: async (req, res) => {
    try {
      const reviews = await models.Review.findAll();
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  addreview: async (req, res) => {
    try {
      const {
        product_id, review, rating, customer_id,
      } = req.body;

      const reviews = await models.Review.Create({
        product_id,
        review,
        rating,
        customer_id,
      });
      return res.status(201).json(reviews);
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
