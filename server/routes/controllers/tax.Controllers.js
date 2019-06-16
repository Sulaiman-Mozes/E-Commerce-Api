const models = require('../../models');

module.exports = {
  list: async (req, res) => {
    const { limit } = req.query;
    try {
      const data = await models.Tax.findAndCountAll({ order: [['tax_id']], limit });
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
    const { tax_id } = req.params;
    const id = parseInt(tax_id, 10);
    try {
      const data = await models.Tax.findByPk(id);
      if (!data) {
        return res.status(400).json({
          error: {
            status: 404,
            code: 'TAX_01',
            message: "Don't exist tax with this ID",
          },
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({
        error: {
          status: 400,
          code: 'TAX_02',
          message: 'The ID is not a number.',
        },
      });
    }
  },
};
