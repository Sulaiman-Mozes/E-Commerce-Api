

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attributes: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, { timestamps: false });

  OrderDetail.associate = (models) => {
    models.OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id' });
    models.OrderDetail.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return OrderDetail;
};
