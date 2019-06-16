
module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    attribute_value_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, { timestamps: false });

  AttributeValue.associate = (models) => {
    models.AttributeValue.belongsTo(models.Attribute, { foreignKey: 'attribute_id' });
  };
  return AttributeValue;
};
