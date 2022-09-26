module.exports = (app) =>
{
    const product = require("../controllers/product.controller.js");
    var router = require("express").Router();

    router.post("/add", product.create);                // Crear un product
    router.get("/all", product.findAll);                // buscar products (con condición)
    router.get("/:id_product", product.findOne);        // buscar product con id
    router.put("/:id_product", product.update);         // actualizar product
    router.delete("/:id_product", product.delete);      // eliminar product con id
    router.delete("/", product.deleteAll);              // eliminar todos los products

    // agregar rutas al servidor
    app.use('/product', router);
}