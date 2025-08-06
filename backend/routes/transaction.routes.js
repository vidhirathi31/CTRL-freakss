module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Transaction for an Asset
    router.post("/", transactions.create);
  
    // Retrieve all Transactions for an Asset
    router.get("/asset/:assetId", transactions.findAllForAsset);
  
    // Retrieve a single Transaction with id
    router.get("/:id", transactions.findOne);
  
    // Update a Transaction with id
    router.put("/:id", transactions.update);
  
    // Delete a Transaction with id
    router.delete("/:id", transactions.delete);
  
    // Get transaction summary for an asset
    router.get("/summary/:assetId", transactions.getTransactionSummary);
  
    app.use('/api/transactions', router);
  };