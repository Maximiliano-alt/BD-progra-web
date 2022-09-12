module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {

        first_name: { type: Sequelize.STRING(30), allowNull: false, validate: {len: [2,10]}},              // only allow values with length between 2 and 10}},
        last_name:  { type: Sequelize.STRING(30), allowNull: false, validate: {len: [2,10]}},
        rut:        { type: Sequelize.STRING(15), allowNull: false, primaryKey: true },
        direction:  { type: Sequelize.STRING(40), allowNull: false },
        mail:       { type: Sequelize.STRING(25), allowNull: false , validate: {isEmail: true}}, // checks for email format (foo@bar.com)
        password:   { type: Sequelize.STRING(30), allowNull: false }

    });
    return User;

}