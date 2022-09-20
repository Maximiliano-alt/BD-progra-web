module.exports = (sequelize, Sequelize) => {
    const Provider = sequelize.define("providers", {

        id_provider: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey:true }
        },
        {
            hooks : {
                beforeCreate : (provider, options) => {
                    // provider.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
                    // provider.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
                },
                beforeUpdate : (provider, options) => {
                    //provider.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
                }
            }
        }
    );
    return Provider;
}

// rut:         { type: Sequelize.STRING(15),  allowNull: false, 
//     references: {
//         model: 'users', // This is a reference to another model
//         key: 'rut',  // This is the column name of the referenced model
//     }
// }