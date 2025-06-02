const { pool } = require('../db');

const getAll = () => pool.query('SELECT * FROM clients ORDER BY id');
const getById = (id) => pool.query('SELECT * FROM clients WHERE id = $1', [id]);
const create = (name, email, shipping_address) => 
  pool.query(
    'INSERT INTO clients (name, email, shipping_address) VALUES ($1, $2, $3) RETURNING *',
    [name, email, shipping_address]
  );
const update = (id, name, email, shipping_address) =>
  pool.query(
    'UPDATE clients SET name = $1, email = $2, shipping_address = $3 WHERE id = $4 RETURNING *',
    [name, email, shipping_address, id]
  );
const deleteClient = (id) =>
  pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);

module.exports = { getAll, getById, create, update, deleteClient };