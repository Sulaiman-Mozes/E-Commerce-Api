/* eslint-disable camelcase */
const helpers = require('../../commons');

module.exports = {
  Id: async (req, res, next) => {
    const { category_id } = req.params;

    if (!helpers.isPositiveInteger(category_id)) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'CAT_02',
          message: 'Category Id should be an interger',
          field: 'category_id',
        },
      });
    }
    return next();
  },
};
