module.exports = (sequelize, Sequelize) => {
    const Asset = sequelize.define("asset", {
      assetName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      currentValue: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      totalValue: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  
    return Asset;
  };