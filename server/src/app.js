require('dotenv').config();
const express = require('express');
const db = require('./db');
const productRoutes = require('./products/product.routes');
const orderRoutes = require('./orders/order.routes')
const clientRoutes = require('./clients/client.routes')

const app = express();
app.use(express.json());

// Connect to DB
db.connect();

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/clients', clientRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', db: db.connected ? 'connected' : 'disconnected' });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});