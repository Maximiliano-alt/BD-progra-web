// Importe de dependencias
const dbConfig  = require("../config/db.config.js"); // prop de la bd
const Sequelize = require("sequelize");

const associateUser = () => 
{
  // usuario puede ser un proovedor
  db.user.hasOne(db.provider, {
    foreignKey: {
      name: 'rut',
      type: Sequelize.STRING(15),
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  
  // o un usuario puede ser un cliente
  db.user.hasOne(db.client, {
    foreignKey: {
      name: 'rut',
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

// una compra referencia a un cliente y a un carro con productos
const associateBuy = () => 
{
  db.client.belongsToMany(db.cart, { through: db.buy,
    foreignKey: {
      name: 'id_client',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  db.cart.belongsToMany(db.client, { through: db.buy,
    foreignKey: {
      name: 'id_cart',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

// un producto es referenciado por un proveedor
const associateProduct = () =>
{
  db.provider.hasMany(db.product, {
    foreignKey: {
      name: 'id_provider',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

// producto/s comprado/s pertenece a un carro y hace referencia a producto/s
const associatePurchased = () =>
{
  db.cart.hasMany(db.purchasedProduct, {
    foreignKey: {
      name: 'id_cart',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  db.product.hasOne(db.purchasedProduct, {
    foreignKey: {
      name: 'id_product',
      type: Sequelize.INTEGER,
      allowNull: false
    },
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

db.product  = require("./product.model.js")(sequelize, Sequelize);
associateProduct();

db.buy      = require("./buy.model.js")(sequelize, Sequelize);
db.cart     = require("./cart.model.js")(sequelize, Sequelize);
associateBuy();

db.purchasedProduct = require("./purchasedProduct.model.js")(sequelize, Sequelize);
associatePurchased();

module.exports = db;