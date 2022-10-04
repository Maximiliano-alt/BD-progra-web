module.exports = (sequelize, Sequelize) =>
{
    const PurchasedProduct = sequelize.define("purchased_products", {
        id_purchased: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true,primaryKey: true },
        units:        { type: Sequelize.INTEGER, allowNull: false }
    });
    //PurchasedProduct.removeAttribute('id'); // para eliminar el id por defecto que sequelize añade
    return PurchasedProduct;
}