# Interview Shop App
A small application exposing an api of products, orders and clients using Node.js + Express and PostgreSQL

# How to run
Install Docker and from the root folder run "docker-compose up"

# API Documentation

## Products
- `GET /products` - List all products
- `GET /products/:id` - Get specific product
- `POST /products` - Create new product  
  ```
  { "name": "string", "price": number, "quantity": integer }
  ```
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Orders
- `GET /orders` - List all orders
- `POST /orders` - Create order  
  ```
  {
    "client_id": integer,
    "items": [{"product_id": integer, "quantity": integer}],
    "status": "pending|completed|shipped"
  }
  ```
- `DELETE /orders/:id` - Cancel order

## Clients
- `GET /clients` - List clients
- `POST /clients` - Register client  
  ```
  {
    "name": "string",
    "email": "string",
    "shipping_address": "string"
  }
  ```