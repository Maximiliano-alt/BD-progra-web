module.exports = app => {
    const clients = require("../controllers/client.controller.js");
    var router = require("express").Router();
    // Crear un cliente
    router.post("/", clients.create);
    // buscar clientes (con condición)
    router.get("/", clients.findAll);
    // buscar cliente con id
    router.get("/:id", clients.findOne);
    // actualizar cliente
    router.put("/:id", clients.update);
    // eliminar cliente con id
    router.delete("/:id", clients.delete);
    // eliminar todos los clientes
    router.delete("/", clients.deleteAll);
    // agregar rutas al servidor
    app.use('/api/client', router);
 };
