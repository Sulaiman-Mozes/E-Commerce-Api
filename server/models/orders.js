

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defautValue: 0.00,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shipped_on: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defautValue: 0,
    },
    comments: {
      type: DataTypes.STRING(255),
    },
    auth_code: {
      type: DataTypes.STRING(50),
    },
    reference: {
      type: DataTypes.STRING(50),
    },
  }, { timestamps: false });

  Order.associate = (models) => {
    models.Order.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    models.Order.belongsTo(models.Shipping, { foreignKey: 'shipping_id' });
    models.Order.belongsTo(models.Tax, { foreignKey: 'tax_id' });
  };

  return Order;
};
