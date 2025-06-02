const { pool } = require('../db');

const getAll = () => pool.query('SELECT * FROM products ORDER BY id');
const getById = (id) => pool.query('SELECT * FROM products WHERE id = $1', [id]);
const create = (name, price, quantity) => 
  pool.query(
    'INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *',
    [name, price, quantity]
  );
const update = (id, name, price, quantity) =>
  pool.query(
    'UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *',
    [name, price, quantity, id]
  );
const deleteProduct = (id) =>
  pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

module.exports = { getAll, getById, create, update, deleteProduct };