module.exports = app => 
{
    const provider = require("../controllers/provider.controller.js");
    var router     = require("express").Router();

    router.post("/add", provider.create);             // Crear un provider
    router.get("/all", provider.findAll);             // buscar providers (con condición)
    router.get("/:id_provider", provider.findOne);      // buscar providers con id
    router.put("/:id_provider", provider.update);       // actualizar providers
    router.delete("/:id_provider", provider.delete);    // eliminar providers con id
    router.delete("/", provider.deleteAll);           // eliminar todos los providers
    
    app.use('/provider', router);
};