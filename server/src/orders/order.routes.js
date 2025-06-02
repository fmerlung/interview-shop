const express = require('express');
const router = express.Router();
const { 
  getAll, 
  getById, 
  create, 
  updateStatus, 
  deleteOrder 
} = require('./order.model');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const { rows } = await getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  const { client_id, items, status } = req.body;
  try {
    const { rows } = await create(client_id, items, status);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { rows } = await updateStatus(req.params.id, req.body.status);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await deleteOrder(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully', deletedOrder: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;