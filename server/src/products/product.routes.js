const express = require('express');
const router = express.Router();
const { 
  getAll, 
  getById, 
  create, 
  update, 
  deleteProduct 
} = require('./product.model');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { rows } = await getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new product
router.post('/', async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const { rows } = await create(name, price, quantity);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const { rows } = await update(req.params.id, name, price, quantity);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await deleteProduct(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ 
      message: 'Product deleted successfully',
      deletedProduct: rows[0]
    });
  } catch (err) {
    if (err.code === '23503') { // Foreign key violation
      res.status(400).json({ 
        error: 'Cannot delete product referenced in orders' 
      });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router;