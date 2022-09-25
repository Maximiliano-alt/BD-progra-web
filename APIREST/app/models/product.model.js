module.export = (sequelize, Sequelize) =>
{
    const Product = sequelize.define("products", {
        id_product:     { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey:true },
        category:       { type: Sequelize.STRING(30), allowNull: false },
        name_product:   { type: Sequelize.STRING(30), allowNull: false },
        mark:           { type: Sequelize.STRING(30), allowNull: false },
        price:          { type: Sequelize.INTEGER, allowNull: false },
        description:    { type: Sequelize.STRING(100), allowNull: true },
        stock:          { type: Sequelize.INTEGER, allowNull: false }
    })
    return Product;
}