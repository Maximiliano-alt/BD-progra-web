module.exports = (sequelize, Sequelize) =>
{
    const Buy = sequelize.define("buys", {

        id_buy:         { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        date_buy:       { type: Sequelize.DATE, allowNull: false },
        total_products: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false , validate: { min: 1 }},
        total_price:    { type: Sequelize.INTEGER.UNSIGNED, allowNull: false }
    })

    return Buy;
}