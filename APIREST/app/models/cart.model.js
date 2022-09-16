module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("carts", {

        id_cart:        { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey:true },
        total_products: { type: Sequelize.INTEGER, allowNull:false },
        price:          { type: Sequelize.DOUBLE, allowNull: false }
    });

    return Cart;
}