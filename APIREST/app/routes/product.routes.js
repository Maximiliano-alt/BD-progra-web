module.exports = (app) =>
{
    const product = require("../controllers/product.controller.js");
    var router = require("express").Router();

    router.post("/add", product.create);                                // Crear un product
    router.get("/all", product.findAll);                                // buscar todos los products
    router.get("/all-byStock/:stock", product.findAllByStock);          // busca todos lo productos de tal categoria
    router.get("/:id_prod", product.findOne);                            // buscar un producto
    router.put("/:id_prod", product.update);                         // actualizar product
    router.delete("/:id_prod", product.delete);                      // eliminar product con id
    router.delete("/", product.deleteAll);                              // eliminar todos los products

    // agregar rutas al servidor
    app.use('/product', router);
}