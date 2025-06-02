const { pool } = require('../db');

const getAll = () => pool.query(`
  SELECT o.*, c.name as client_name 
  FROM orders o
  JOIN clients c ON o.client_id = c.id
  ORDER BY o.created_at DESC
`);

const getById = (id) => pool.query(`
  SELECT o.*, c.name as client_name 
  FROM orders o
  JOIN clients c ON o.client_id = c.id
  WHERE o.id = $1
`, [id]);

const create = (clientId, items, status = 'pending') =>
  pool.query(
    'INSERT INTO orders (client_id, items, status) VALUES ($1, $2, $3) RETURNING *',
    [clientId, JSON.stringify(items), status]
  );

const deleteOrder = (id) => pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);

const updateStatus = (id, newStatus) =>
  pool.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [newStatus, id]);

module.exports = { getAll, getById, create, updateStatus, deleteOrder };