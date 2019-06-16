/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../../models');


module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await models.Customer.findOrCreate({
        where: { email },
        defaults: { name, password },
        attributes: { exclude: ['password'] },
      });
      const status = newUser[1];
      const user = newUser[0];

      if (status === false) {
        return res.status(400).json({
          error: {
            status: 400,
            code: 'USR_04',
            message: 'The email already exist.',
            field: 'email',
          },
        });
      }
      const token = jwt.sign({
        data: { id: user.id, name: user.name, email: user.email },
      }, process.env.SECRET, { expiresIn: '24h' });

      return res.status(201).json({
        customer: user,
        accessToken: `Bearer ${token}`,
        expires_in: '24h',
      });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await models.Customer.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({
          error: {
            status: 400,
            code: 'USR_05',
            message: "The email doesn't exist.",
            field: 'email',
          },
        });
      }

      const verifyPassword = bcrypt.compareSync(password, user.password);
      if (!verifyPassword) {
        return res.status(400).json({
          error: {
            status: 400,
            code: 'USR_01',
            message: 'Email or Password is invalid.',
            field: 'password',
          },
        });
      }
      const token = jwt.sign(
        { data: { customer_id: user.customer_id, name: user.name, email: user.email } },
        process.env.SECRET,
        { expiresIn: '24h' },
      );

      return res.status(200).json({
        customer: user,
        accessToken: `Bearer ${token}`,
        expires_in: '24h',
      });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },

  socialAuth: (req, res) => { },
  address: async (req, res) => {
    try {
      const {
        customer_id, address_1, address_2, city, region, postal_code, country, shipping_region_id,
      } = req.body;
      const customer = await models.Customer.findOne({
        where: { customer_id },
        attributes: { exclude: ['password'] },
      });
      const updatecustomer = await customer.update({
        address_1, address_2, city, region, postal_code, country, shipping_region_id,
      }, { hooks: false });
      return res.status(200).json({ customer: updatecustomer });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  creditcard: async (req, res) => {
    try {
      const { customer_id, credit_card } = req.body;
      const customer = await models.Customer.findOne({
        where: { customer_id },
        attributes: { exclude: ['password'] },
      });
      const updatecustomer = await customer.update({ credit_card }, { hooks: false });
      return res.status(200).json({ customer: updatecustomer });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  profile: async (req, res) => {
    try {
      const {
        customer_id, name, email, password, day_phone, eve_phone, mob_phone,
      } = req.body;
      const customer = await models.Customer.findOne({
        where: { customer_id },
        attributes: { exclude: ['password'] },
      });
      const updatecustomer = await customer.update({
        name, email, password, day_phone, eve_phone, mob_phone,
      }, { hooks: !!password, returning: false });
      return res.status(200).json({ customer: updatecustomer });
    } catch (error) {
      return res.status(500).json({
        error: {
          status: 500,
          message: error.name,
        },
      });
    }
  },
  details: async (req, res) => {
    try {
      const { customer_id } = req.body;
      const customer = await models.Customer.findOne({
        where: { customer_id },
        attributes: { exclude: ['password'] },
      });
      return res.status(200).json({ customer });
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
