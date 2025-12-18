const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Session", {
    minutes: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    note: { type: DataTypes.STRING, allowNull: true }
  });
};
