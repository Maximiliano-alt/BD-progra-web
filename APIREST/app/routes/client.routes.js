module.exports = app => {
    const client = require("../controllers/client.controller.js");
    var router = require("express").Router();
    router.post("/add", client.create); // Crear un cliente
    router.get("/all", client.findAll); // buscar clientes (con condición)
    // buscar cliente con id
    //router.get("/:id", client.findOne);
    // actualizar cliente
    //router.put("/:id", client.update);
    // eliminar cliente con id
    //router.delete("/:id", client.delete);
    // eliminar todos los clientes
    //router.delete("/", client.deleteAll);
    // agregar rutas al servidor
    app.use('/client', router);
};
