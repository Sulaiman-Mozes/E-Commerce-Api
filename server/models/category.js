'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: { type: DataTypes.TEXT(1000) },
  }, { timestamps: false });

  Category.associate = (models) => {
    models.Category.belongsTo(models.Department, { foreignKey: 'department_id' });

    models.Category.belongsToMany(models.Product,
      {
        as: 'product_category', through: 'ProductCategory', foreignKey: 'category_id', timestamps: false,
      });
  };
  return Category;
};
