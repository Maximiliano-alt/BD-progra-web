// Importe de dependencias
const dbConfig  = require("../config/db.config.js"); // prop de la bd
const Sequelize = require("sequelize");

const associateUser = () => {
  // ususraio puede ser un proovedor
  db.user.hasOne(db.provider, {
    foreignKey: {
      name: 'rut',
      type: Sequelize.STRING(15),
      allowNull: false
    }
  },{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }); // una categoria tiene muchos productos
  
  // o un usuario puede ser un cliente
  db.user.hasOne(db.client, {
    foreignKey: {
      name: 'rut',
      type: Sequelize.STRING(15),
      allowNull: false,
    }
  },{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

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
db.user     = require("./user.model.js")(sequelize, Sequelize);
db.client   = require("./client.model.js")(sequelize, Sequelize);
db.provider = require("./provider.model.js")(sequelize, Sequelize);
associateUser();

db.cart     = require("./cart.model.js")(sequelize, Sequelize);


module.exports = db;