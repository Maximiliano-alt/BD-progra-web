module.exports = app => 
{
    const cart = require("../controllers/cart.controller.js");
    var router = require("express").Router();

    router.post("/add", cart.create);
    router.get("/all", cart.findAll);
    
    app.use('/cart', router);
};