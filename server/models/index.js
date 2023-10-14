"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const config = require(__dirname + "/../config/config.json")["development"];

const db = {};

const sequelize = new Sequelize(
  config.database, // sesac
  config.username, // user
  config.password, // 1234
  config // {}
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Todo = require("./todo")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);

module.exports = db;
