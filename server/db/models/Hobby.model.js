const { DataTypes } = require('sequelize');

module.exports = (sequelize, models) => {
  const model = sequelize.define('Hobby', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
  });
  
  return model;
}