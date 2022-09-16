module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    router.post("/add", user.create); // Crear un user
    router.get("/all", user.findAll); // buscar users (con condición)
    // buscar user con id
    //router.get("/:id", user.findOne);
    // actualizar user
    //router.put("/:id", user.update);
    router.delete("/:rut", user.delete); // eliminar user con id=rut
    // eliminar todos los users
    //router.delete("/", user.deleteAll);
    // agregar rutas al servidor
    app.use('/user', router);
 };