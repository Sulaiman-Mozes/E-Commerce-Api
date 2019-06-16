
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(1000),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    image_2: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    display: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, { timestamps: false });

  Product.associate = (models) => {
    models.AttributeValue.belongsToMany(models.Product, {
      as: 'product_attribute', through: 'ProductAttribute', foreignKey: 'attribute_value_id', timestamps: false,
    });
    models.Product.belongsToMany(models.AttributeValue, {
      as: 'product_attribute', through: 'ProductAttribute', foreignKey: 'product_id', timestamps: false,
    });

    models.Product.belongsToMany(models.Category,
      {
        as: 'product_category', through: 'ProductCategory', foreignKey: 'product_id', timestamps: false,
      });
  };

  return Product;
};
