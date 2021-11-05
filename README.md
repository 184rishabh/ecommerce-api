# E-Commerce-API

# Usage
- clone
- install packages
- change .env file with port and mongourl for your database
- deploy

### This API has been made for a small scale e-commerce businesses.

# Made with:
- Node.js
- MongoDB and Mongoose
- Express

# Documentation

Base-Url-http://localhost:3000/api/

| account | Method | How to Use|Description |
| --- | --- | --- |--- |
| auth/register | `post` | Accepts the Username ,Email,<br>Password of User | Registers the user |
| auth/login | `post` | Accepts Username and Password | User Login |

##

| user routes | Method | How to Use |Description |
| --- | --- | --- |--- |
| `user/:id` | `put` | Call the API with required bearer JWT token in<br> header and the details that are to be changed.| Update user credential |
| `user/find` | `get` | Call the API with required bearer JWT token |find all user registered |
| `user/:id` | `delete` | Call the API with required bearer JWT token | deletes the user |

##

| product routes | Method | How to Use | Description |
| --- | --- | --- | --- |
| `product/`| `post` | Requires a JSON of prodict details and JWT token in the header | adds the product |
| `product/find/:id` | `get` | Just call the API | find single product using id |
| `product/` | `get` | Call the API with JWT toke in header | gives list of all products |
| `product?new={number}` | `get` | Just call the API with query string | gives latest products {count=number entered in query string}  |
| `product?category={name}` | `get` | Just call the API with query string | filters product according to the category |
| `product/:id` | `delete` | Call the API with JWT token in the header | delete product with given id |
| `product/:id` | `put` |  Requires a JSON of changed detail of product and JWT token in the header | updates the products with given id |
