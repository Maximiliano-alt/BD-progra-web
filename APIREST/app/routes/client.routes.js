module.exports = app => {
    const client = require("../controllers/client.controller.js");
    var router = require("express").Router();
    // Crear un cliente
    router.post("/", client.create);
    // buscar clientes (con condición)
    //router.get("/", client.findAll);
    // buscar cliente con id
    //router.get("/:id", client.findOne);
    // actualizar cliente
    //router.put("/:id", client.update);
    // eliminar cliente con id
    //router.delete("/:id", client.delete);
    // eliminar todos los clientes
    //outer.delete("/", client.deleteAll);
    // agregar rutas al servidor
    app.use('/api/client', router);
 };
