const express = require('express');
const router = express.Router();
const { 
  getAll, 
  getById, 
  create, 
  update, 
  deleteClient 
} = require('./client.model');

// Get all clients
router.get('/', async (req, res) => {
  try {
    const { rows } = await getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new client
router.post('/', async (req, res) => {
  const { name, email, shipping_address } = req.body;
  try {
    const { rows } = await create(name, email, shipping_address);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Unique violation
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

// Update client
router.put('/:id', async (req, res) => {
  const { name, email, shipping_address } = req.body;
  try {
    const { rows } = await update(req.params.id, name, email, shipping_address);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await deleteClient(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ 
      message: 'Client deleted successfully',
      deletedClient: rows[0]
    });
  } catch (err) {
    if (err.code === '23503') { // Foreign key violation
      res.status(400).json({ 
        error: 'Cannot delete client with existing orders' 
      });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router;