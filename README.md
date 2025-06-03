# Interview Shop App
A small application exposing an api of products, orders and clients using Node.js + Express and PostgreSQL

# How to run
Install Docker, then from the root of the project run "docker compose up". \
From this point on the api of the shop app is exposed. \
A list of http requests used during testing can be found in the api_test.http file.

# API Documentation

## Products
- `GET /products` - List all products
- `GET /products/:id` - Get specific product
- `POST /products` - Create new product  
  ```
  { 
    "name": "string", 
    "price": number, 
    "quantity": integer 
  }
  ```
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Orders
- `GET /orders` - List all orders
- `GET /orders/:id` - Get specific order
- `POST /orders` - Create order  
  ```
  {
    "client_id": integer,
    "items": [{"product_id": integer, "quantity": integer}],
    "status": "pending|completed|shipped"
  }
  ```
- `DELETE /orders/:id` - Delete order

## Clients
- `GET /clients` - List all clients
- `GET /clients/:id` - Get specific client
- `POST /clients` - Register new client  
  ```
  {
    "name": "string",
    "email": "string",
    "shipping_address": "string"
  }
  ```
- `DELETE /clients/:id` - Delete client