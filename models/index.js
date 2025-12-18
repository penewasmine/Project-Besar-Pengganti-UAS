const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

const db = {};
db.sequelize = sequelize;

db.Task = require("./Task")(sequelize);
db.Session = require("./Session")(sequelize);

db.Task.hasMany(db.Session, { foreignKey: "taskId", onDelete: "CASCADE" });
db.Session.belongsTo(db.Task, { foreignKey: "taskId" });

module.exports = db;
