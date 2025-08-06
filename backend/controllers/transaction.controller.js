const db = require("../models");
const Transaction = db.transactions;
const Asset = db.assets;
const Op = db.Sequelize.Op;

// Create and Save a new Transaction for an Asset
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.assetId || !req.body.transactionType) {
    res.status(400).send({
      message: "assetId and transactionType can't be empty!"
    });
    return;
  }

  try {
    // Check if asset exists
    const asset = await Asset.findByPk(req.body.assetId);
    if (!asset) {
      return res.status(404).send({
        message: `Asset with id=${req.body.assetId} not found.`
      });
    }

    // Calculate totalAmount if not provided
    const totalAmount = req.body.totalAmount || 
                       (req.body.quantity * req.body.pricePerUnit);

    // Create a Transaction
    const transaction = {
      transactionType: req.body.transactionType,
      quantity: req.body.quantity,
      pricePerUnit: req.body.pricePerUnit,
      totalAmount: totalAmount,
      notes: req.body.notes,
      assetId: req.body.assetId
    };

    // Save Transaction in the database
    const createdTransaction = await Transaction.create(transaction);
    
    // Update asset quantity based on transaction
    if (transaction.transactionType === 'buy') {
      await asset.increment('quantity', { by: transaction.quantity });
    } else {
      await asset.decrement('quantity', { by: transaction.quantity });
    }
    
    // Recalculate asset's total value
    await asset.reload();
    asset.totalValue = asset.quantity * asset.currentValue;
    await asset.save();

    res.send(createdTransaction);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error creating Transaction."
    });
  }
};

// Retrieve all Transactions for an Asset
exports.findAllForAsset = async (req, res) => {
  const assetId = req.params.assetId;

  try {
    const transactions = await Transaction.findAll({
      where: { assetId: assetId },
      order: [['transactionDate', 'DESC']],
      include: [{
        model: Asset,
        as: 'asset',
        attributes: ['assetName', 'assetType']
      }]
    });
    res.send(transactions);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving Transactions for asset with id=${assetId}.`
    });
  }
};

// Retrieve a single Transaction with id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findByPk(id, {
      include: [{
        model: Asset,
        as: 'asset',
        attributes: ['assetName', 'assetType']
      }]
    });

    if (transaction) {
      res.send(transaction);
    } else {
      res.status(404).send({
        message: `Transaction with id=${id} not found.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Transaction with id=" + id
    });
  }
};

// Update a Transaction by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // Recalculate totalAmount if quantity or pricePerUnit changes
    if (req.body.quantity || req.body.pricePerUnit) {
      const transaction = await Transaction.findByPk(id);
      req.body.totalAmount = (req.body.quantity || transaction.quantity) * 
                            (req.body.pricePerUnit || transaction.pricePerUnit);
    }

    const [num] = await Transaction.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Transaction was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Transaction with id=" + id
    });
  }
};

// Delete a Transaction with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).send({
        message: `Transaction with id=${id} not found.`
      });
    }

    const asset = await Asset.findByPk(transaction.assetId);
    
    // Reverse the transaction effect on asset quantity
    if (transaction.transactionType === 'buy') {
      await asset.decrement('quantity', { by: transaction.quantity });
    } else {
      await asset.increment('quantity', { by: transaction.quantity });
    }
    
    // Recalculate asset's total value
    await asset.reload();
    asset.totalValue = asset.quantity * asset.currentValue;
    await asset.save();

    // Now delete the transaction
    const num = await Transaction.destroy({
      where: { id: id }
    });

    res.send({
      message: "Transaction was deleted successfully!"
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Transaction with id=" + id
    });
  }
};

// Get transaction history summary for an asset
exports.getTransactionSummary = async (req, res) => {
  const assetId = req.params.assetId;

  try {
    const result = await Transaction.findAll({
      where: { assetId: assetId },
      attributes: [
        'transactionType',
        [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalQuantity'],
        [db.sequelize.fn('SUM', db.sequelize.col('totalAmount')), 'totalAmount'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: ['transactionType']
    });

    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error calculating transaction summary."
    });
  }
};