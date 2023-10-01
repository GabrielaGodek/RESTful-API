# Database for LazyCup app
RESTful API with NodeJS and Express.
It will power two applications:
- [LazyCup](lazycup.vercel.app)
- Custom CMS for updating available list of coffees

## Features
- Users can sign up and login to their accounts
- Users can add, update or delete coffee

## Technologies
- NodeJS
- ExpressJS
- MongoDB
- Mongoose

## Available endpoints
### Return all coffees
`GET /coffees`

---
### Create coffee
`POST /coffees`

---
### Return returned coffee
`GET /coffees/:id`

---

### Update returned coffee
`PATCH /coffees/:id`

---


### Delete returned coffee
`DELETE /coffees/:id`

---
### Return all registered users
`GET /users/`

---

### Create user
`POST /users`

---
### Return selected user
`GET /users/:id`




