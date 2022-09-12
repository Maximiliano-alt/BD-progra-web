module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {

      id:  { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      rut: { type: Sequelize.STRING(15), allowNull: false,
            references: {
              model: 'users', // This is a reference to another model
              key: 'rut',  // This is the column name of the referenced model
        
              // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
              //deferrable: Deferrable.INITIALLY_IMMEDIATE
              // Options:
              // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
              // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
              // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
            }
      }

    });
    return Client;
};
  