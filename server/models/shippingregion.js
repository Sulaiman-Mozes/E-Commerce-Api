
module.exports = (sequelize, DataTypes) => {
  const shippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shipping_region: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, { timestamps: false });

  return shippingRegion;
};
