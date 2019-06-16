
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });

  Review.associate = (models) => {
    models.Review.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    models.Review.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return Review;
};
