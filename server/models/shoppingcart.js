
module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    attributes: {
      type: DataTypes.TEXT(1000),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buy_now: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    added_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, { timestamps: false });

  ShoppingCart.associate = (models) => {
    models.ShoppingCart.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return ShoppingCart;
};
