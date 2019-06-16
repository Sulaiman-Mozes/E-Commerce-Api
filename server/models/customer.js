const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    credit_card: {
      type: DataTypes.TEXT,
    },
    address_1: {
      type: DataTypes.STRING(100),
    },
    address_2: {
      type: DataTypes.STRING(100),
    },
    city: {
      type: DataTypes.STRING(100),
    },
    region: {
      type: DataTypes.STRING(100),
    },
    postal_code: {
      type: DataTypes.STRING(100),
    },
    country: {
      type: DataTypes.STRING(100),
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      defaultValue: '1',
      allowNull: false,
    },
    day_phone: {
      type: DataTypes.STRING(100),
    },
    eve_phone: {
      type: DataTypes.STRING(100),
    },
    mob_phone: {
      type: DataTypes.STRING(100),
    },
  }, {
    timestamps: false,
    hooks: {
      afterValidate: (user) => {
        // eslint-disable-next-line no-param-reassign
        user.password = bcrypt.hashSync(user.password, saltRounds);
      },
    },
  });

  Customer.associate = (models) => {
    models.Customer.belongsTo(models.ShippingRegion, { foreignKey: 'shipping_region_id' });
  };


  return Customer;
};
