/* eslint-disable camelcase */
const models = require('../../models');

module.exports = {
  list: async (req, res) => {
    try {
      const data = await models.Department.findAll();
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
  get: async (req, res) => {
    const { department_id } = req.params;
    try {
      const data = await models.Department.findByPk(department_id);
      if (!data) {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'DEP_01',
            message: "Don't exist department with this ID",
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
};
