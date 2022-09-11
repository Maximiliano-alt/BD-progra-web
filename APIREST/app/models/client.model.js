module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {

      name:    { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false }
      
    });
    return Client;
};
  