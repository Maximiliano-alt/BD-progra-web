// Importe de dependencias
const dbConfig = require("../config/db.config.js"); // prop de la bd
const Sequelize = require("sequelize");

// Inicialización de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa modelos a Sequelize
//db.client = require("./client.model.js")(sequelize, Sequelize);
db.user   = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
