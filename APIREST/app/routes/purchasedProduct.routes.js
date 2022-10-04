module.exports = app => 
{
    const purchasedProduct = require("../controllers/purchasedProduct.controller.js");
    var router = require("express").Router();

    router.post("/add", purchasedProduct.create);
    router.get("/all", purchasedProduct.findAll);
    router.get("/:id", purchasedProduct.findOne);            // buscar purchasedProduct por id
    router.put("/:id", purchasedProduct.update);             // actualizar purchasedProduct
    router.delete("/:id", purchasedProduct.delete);          // eliminar purchasedProduct con id cart
    router.delete("/", purchasedProduct.deleteAll);          // eliminar todas los productos comprados
    
    app.use('/purchasedProduct', router);
};