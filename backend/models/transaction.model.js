module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
      tDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      type: {
        type: Sequelize.ENUM('buy', 'sell'),
        allowNull: false
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      pricePerUnit: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      purchasePrice: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  
    return Transaction;
  };