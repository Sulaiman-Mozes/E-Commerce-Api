

module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shipping_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shipping_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });

  Shipping.associate = (models) => {
    models.Shipping.belongsTo(models.ShippingRegion, { foreignKey: 'shipping_region_id' });
  };

  return Shipping;
};
