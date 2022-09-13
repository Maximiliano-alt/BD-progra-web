module.exports = app => {
    const provider = require("../controllers/provider.controller.js");
    var router     = require("express").Router();

    router.post("/add", provider.create);
    router.get("/all", provider.findAll);
    
    app.use('/provider', router);
};