-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL ,
  email VARCHAR(255) UNIQUE NOT NULL,
  shipping_address TEXT NOT NULL
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  items JSONB NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert 5 Products
INSERT INTO products (name, price, quantity) VALUES
  ('ProductA', 99.99, 50),
  ('ProductB', 799.95, 25),
  ('ProductC', 59.50, 30),
  ('ProductD', 1299.95, 15),
  ('ProductE', 89.95, 40);

-- Insert 5 Clients
INSERT INTO clients (name, email, shipping_address) VALUES
  ('John Smith', 'john.smith@email.com', '123 Main St, Anytown, USA'),
  ('Emma Johnson', 'emma.j@email.com', '456 Oak Ave, Somewhere, USA'),
  ('Michael Brown', 'michael.b@email.com', '789 Pine Rd, Nowhere, USA'),
  ('Sarah Davis', 'sarah.d@email.com', '321 Elm Blvd, Anycity, USA'),
  ('David Wilson', 'david.w@email.com', '654 Maple Ln, Yourtown, USA');

-- Insert 5 Orders
INSERT INTO orders (client_id, items, status) VALUES
  (1, '[{"product_id": 1, "quantity": 2}, {"product_id": 3, "quantity": 1}]', 'completed'),
  (2, '[{"product_id": 2, "quantity": 1}]', 'shipped'),
  (3, '[{"product_id": 4, "quantity": 1}, {"product_id": 5, "quantity": 2}]', 'processing'),
  (4, '[{"product_id": 3, "quantity": 3}]', 'pending'),
  (5, '[{"product_id": 1, "quantity": 1}, {"product_id": 2, "quantity": 1}, {"product_id": 5, "quantity": 1}]', 'completed');