module.exports = app => {
    const assets = require("../controllers/asset.controller.js");
    //const { authJwt } = require("../middleware");
  
    var router = require("express").Router();
  
    // Create a new Asset for a User
    router.post("/", assets.create);
  
    // Retrieve all Assets for a User
    router.get("/user/:userId", assets.findAllForUser);
  
    // Retrieve a single Asset with id
    router.get("/:id", assets.findOne);
  
    // Update an Asset with id
    router.put("/:id", assets.update);
  
    // Delete an Asset with id
    router.delete("/:id", assets.delete);
  
    // Get portfolio summary
    router.get("/summary/:userId", assets.getPortfolioSummary);
  
    app.use('/api/assets', router);
  };