module.exports = app =>
{
    const buy = require("../controllers/buy.controller.js");
    var router = require("express").Router();

    router.post("/add", buy.create);
    router.get("/all", buy.findAll);
    
    app.use('/buy', router);
}