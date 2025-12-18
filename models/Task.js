const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    course: { type: DataTypes.STRING, allowNull: false },
    dueDate: { type: DataTypes.DATEONLY, allowNull: false },
    estimatedHours: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0.25 } },
    difficulty: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
  });
};
