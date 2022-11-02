// Importe de dependencias
const dbConfig  = require("../config/db.config.js"); // prop de la bd
const Sequelize = require("sequelize");

const associateUser = () => 
{
  // usuario puede ser un proovedor
  db.user.hasOne(db.provider, {
    foreignKey: {
      name: 'rut',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.provider.belongsTo(db.user, { as: 'providerUser', foreignKey: 'rut' });
  
  // o un usuario puede ser un cliente
  db.user.hasOne(db.client, {
    foreignKey: {
      name: 'rut',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.client.belongsTo(db.user, { as: 'clientUser', foreignKey: 'rut' });
}

// una compra referencia a un cliente y a un carro con productos
const associateBuy = () => 
{
  db.client.hasMany(db.buy, {
    as : 'clientBuys',
    foreignKey: {
      name: 'id_client',
      allowNull: true
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
  db.buy.belongsTo(db.client, { as: 'buyerClient', foreignKey: 'id_client' });

  db.buy.hasMany(db.purchasedProduct, {
    as : 'purchasedProducts',
    foreignKey: {
      name: 'id_buy',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.purchasedProduct.belongsTo(db.buy, { as: 'buyPurchased', foreignKey: 'id_buy' });
}

// un producto es referenciado por un proveedor
const associateProduct = () =>
{
  db.provider.hasMany(db.product, {
    as: 'products',
    foreignKey: {
      name: 'id_provider',
      allowNull: true
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
  db.product.belongsTo(db.provider, { as: 'productProvider', foreignKey: 'id_provider' });
}

// un producto comprado es un producto o se refiere a un producto
const associatePurchased = () =>
{
  db.product.hasOne(db.purchasedProduct, {
    as : 'productPurchased',
    foreignKey: {
      name: 'id_product',
      allowNull: true
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
  db.purchasedProduct.belongsTo(db.product, { as: 'product', foreignKey: 'id_product' })
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

// Importa modelos a Sequelize e inicializar asociaciones
db.user     = require("./user.model.js")(sequelize, Sequelize);
db.client   = require("./client.model.js")(sequelize, Sequelize);
db.provider = require("./provider.model.js")(sequelize, Sequelize);
associateUser();

db.product  = require("./product.model.js")(sequelize, Sequelize);
associateProduct();

db.buy      = require("./buy.model.js")(sequelize, Sequelize);
db.purchasedProduct = require("./purchasedProduct.model.js")(sequelize, Sequelize);
associateBuy();
associatePurchased();

module.exports = db;