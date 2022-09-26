module.exports = app => 
{
    const cart = require("../controllers/cart.controller.js");
    var router = require("express").Router();

    router.post("/add", cart.create);
    router.get("/all", cart.findAll);
    router.get("/:id_cart", cart.findOne);      // buscar cart con id
    router.put("/:id_cart", cart.update);       // actualizar cart
    router.delete("/:id_cart", cart.delete);    // eliminar cart con id
    router.delete("/", cart.deleteAll);         // eliminar todas las compras
    
    app.use('/cart', router);
};