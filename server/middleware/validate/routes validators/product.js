/* eslint-disable camelcase */
const helpers = require('../../commons');

module.exports = {
  Id: async (req, res, next) => {
    const { product_id } = req.params;

    if (!helpers.isPositiveInteger(product_id)) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'PRO_02',
          message: 'Product Id should be an interger',
          field: 'product_id',
        },
      });
    }
    return next();
  },
};
