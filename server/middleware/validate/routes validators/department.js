/* eslint-disable camelcase */
const helpers = require('../../commons');

module.exports = {
  Id: async (req, res, next) => {
    const { department_id } = req.params;

    if (!helpers.isPositiveInteger(department_id)) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'DEP_02',
          message: 'Department Id should be an interger',
          field: 'department_id',
        },
      });
    }
    return next();
  },
};
