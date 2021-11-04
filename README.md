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

url-http://localhost:3000/api/

| account | Method |Description |
| --- | --- | --- |
| auth/register | post {email,username,password} | Registers the user |
| auth/login | post {email,password} | User Login |

##

| user route | Method |Description |
| --- | --- | --- |
| user/:id | put {username,password} | Update user credential in case of forgot password |
| user/find | get | find all user registered |
| user/:id | delete | deletes the user |

##

| product route | Method |Description |
| --- | --- | --- |
| product/ | post with product details | adds the product |
| product/find/:id | get | find single product using id |
| product/ | get | gives list of all products |
| product?new={number} | get | gives latest products {count=number entered in query string}  |
| product?category={name} | get | filters product according to the category |
| product/:id | delete | delete product with given id |
| product/:id | put | updates the products with given id |
