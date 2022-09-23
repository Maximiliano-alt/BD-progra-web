module.exports = app => 
{
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/add", user.create);       // Crear un user
    router.get("/all", user.findAll);       // buscar users (con condición)
    router.get("/:rut", user.findOne);      // buscar user con id
    router.put("/:rut", user.update);       // actualizar user
    router.delete("/:rut", user.delete);    // eliminar user con id=rut
    router.delete("/", user.deleteAll);     // eliminar todos los users

    // agregar rutas al servidor
    app.use('/user', router);
 };