const { DB, USER, PASSWORD, HOST, DIALECT } = require("../config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  operatorsAliases: false,

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.currencies = require("./currency.model.js")(sequelize, Sequelize);

module.exports = db;