module.exports = app =>{
    const provider = require("../controllers/provider.controller.js");
    var router     = require("express").Router;

    router.get("/add", provider.create());
    router.post("/all", provider.findAll());
    
    app.use("/provider", router);
}