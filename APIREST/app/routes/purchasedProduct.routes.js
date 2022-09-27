module.exports = app => 
{
    const purchasedProduct = require("../controllers/purchasedProduct.controller.js");
    var router = require("express").Router();

    router.post("/add", purchasedProduct.create);
    router.get("/all", purchasedProduct.findAll);
    //router.get("/:id_cart", purchasedProduct.findOne);      // buscar purchasedProduct con id cart
    //router.put("/:id_cart", purchasedProduct.update);       // actualizar purchasedProduct
    router.delete("/:id_cart", purchasedProduct.delete);    // eliminar purchasedProduct con id cart
    router.delete("/", purchasedProduct.deleteAll);         // eliminar todas los productos comprados
    
    app.use('/purchasedProduct', router);
};