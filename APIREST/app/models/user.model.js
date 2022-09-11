module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {

        first_name: { type: Sequelize.STRING(30), allowNull: false },
        last_name:  { type: Sequelize.STRING(30), allowNull: false },
        rut:        { type: Sequelize.STRING(15), allowNull: false, primaryKey: true },
        direction:  { type: Sequelize.STRING(40), allowNull: false },
        mail:       { type: Sequelize.STRING(25), allowNull: false , validate: {isEmail: true}}, // checks for email format (foo@bar.com)
        password:   { type: Sequelize.STRING(30), allowNull: false }

    });
    return User;

}