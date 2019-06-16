module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define('Audit', {
    audit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });

  Audit.associate = (models) => {
    models.Audit.belongsTo(models.Order, { foreignKey: 'order_id' });
  };
  return Audit;
};
