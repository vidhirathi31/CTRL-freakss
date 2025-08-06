const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Update with your frontend URL
}));
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user.routes');
const assetRoutes = require('./routes/asset.routes');
const transactionRoutes = require('./routes/transaction.routes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/transactions', transactionRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

// Database sync and server start
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});