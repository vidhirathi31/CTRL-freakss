const axios = require('axios');

const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Get free API key from Alpha Vantage

async function getStockPrice(symbol) {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    
    if (response.data['Global Quote']) {
      return {
        symbol: symbol,
        price: parseFloat(response.data['Global Quote']['05. price']),
        change: parseFloat(response.data['Global Quote']['09. change']),
        changePercent: response.data['Global Quote']['10. change percent']
      };
    } else {
      throw new Error('Invalid stock symbol or API limit reached');
    }
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
}

async function getGoldPrice() {
  try {
    // Using Alpha Vantage for gold prices (XAU/USD)
    const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAU&to_currency=USD&apikey=${API_KEY}`);
    
    if (response.data['Realtime Currency Exchange Rate']) {
      return {
        asset: 'Gold',
        price: parseFloat(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']),
        currency: 'USD'
      };
    } else {
      throw new Error('Failed to fetch gold price');
    }
  } catch (error) {
    console.error('Error fetching gold price:', error.message);
    throw error;
  }
}

module.exports = {
  getStockPrice,
  getGoldPrice
};