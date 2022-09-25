module.exports = app =>
{
    const buy = require("../controllers/buy.controller.js");
    var router = require("express").Router();

    router.post("/add", buy.create);
    router.get("/all", buy.findAll);
    router.get("/:id_buy", buy.findOne);      // buscar buy con id
    router.put("/:id_buy", buy.update);       // actualizar buy
    router.delete("/:id_buy", buy.delete);    // eliminar buy con id
    router.delete("/", buy.deleteAll);        // eliminar todas las compras
    
    app.use('/buy', router);
}