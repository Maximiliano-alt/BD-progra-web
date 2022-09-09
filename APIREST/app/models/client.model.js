module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    });
    return Client;
  };
  