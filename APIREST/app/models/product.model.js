module.exports = (sequelize, Sequelize) =>
{
    const Product = sequelize.define("products", {
        id_product:     { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
        category:       { type: Sequelize.STRING(30), allowNull: false },
        name_product:   { type: Sequelize.STRING(30), allowNull: false },
        mark:           { type: Sequelize.STRING(30), allowNull: false },
        price:          { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, validate: { min: 1 }},
        description:    { type: Sequelize.STRING(100), allowNull: true },
        stock:          { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, validate: { min: 0 }}
    })
    return Product;
}