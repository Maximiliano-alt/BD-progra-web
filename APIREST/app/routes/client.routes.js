module.exports = app => 
{
    const client = require("../controllers/client.controller.js");
    var router   = require("express").Router();

    router.post("/add", client.create);                     // Crear un cliente
    router.get("/all", client.findAll);                     // buscar clientes (con condición)
    router.get("/all-name-mail", client.findNameMail);      // buscar seleccionar solo rut y correo
    router.get("/all-buys/:id_client", client.allBuysById);             // buscar todas las compras de un cliente
    router.get("/:id_client", client.findOne);              // buscar cliente con id
    router.put("/:id_client", client.update);               // actualizar cliente
    router.delete("/:id_client", client.delete);            // eliminar cliente con id
    router.delete("/", client.deleteAll);                   // eliminar todos los clientes
    
    // agregar rutas al servidor
    app.use('/client', router);
};
