module.exports = (sequelize, Sequelize) =>
{
    const Buy = sequelize.define("buys", {

        id_buy:         { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        date_buy:       { type: Sequelize.DATE, allowNull: false },
        total_products: { type: Sequelize.INTEGER, allowNull: false },
        total_price:    { type: Sequelize.INTEGER, allowNull: false }
    })

    return Buy;
}