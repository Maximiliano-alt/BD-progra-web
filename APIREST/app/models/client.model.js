module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {

      id_client:  { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      rut:        { type: Sequelize.STRING(15), allowNull: false }
    });
    return Client;
};
