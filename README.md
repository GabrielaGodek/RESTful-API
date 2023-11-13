# RESTful API

## Full CRUD operations and advance filtering

### Installation Guide

1. Clone this repository [here](https://github.com/GabrielaGodek/RESTful-API.git)
2. Run `npm install` to install all dependencies
3. Run `tsc` to compile TypeScript code to JavaScript and create `dist` folder

### Usage

1. When `dist` folder is created, type `npm run start` to connect with MongoDB
2. Connect to the API using Postman on port 3000

### API Endpoints

| HTTP Verbs | Endpoints                                     | Action                                         |
| ---------- | --------------------------------------------- | ---------------------------------------------- |
| POST       | /api/v1/coffees                               | To create new a coffee                         |
| GET        | /api/v1/coffees                               | To retrieve all available coffees              |
| GET        | /api/v1/coffees/:id                           | To retrieve details of a single coffee         |
| PATCH      | /api/v1/coffees/:id                           | To edit the details of a single coffee         |
| DELETE     | /api/v1/coffees/:id                           | To delete a single coffee                      |
| GET        | /api/v1/coffees?price[lte]=11&name=Espresso   | To search specific coffee by values            |
| GET        | /api/v1/coffees?sort=price                    | To sort results by price                       |
| GET        | /api/v1/coffees?fields=name,description,price | To return only desired values not whole object |
| GET        | /api/v1/coffees?page=2&limit=5                | To display results with pagination             |
| GET        | /api/v1/coffees/bestsellers                   | Alias for 3 cheapest coffee                    |

### Technologies

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

### Authors

Gabriela Godek

### License

This project is available for use under the MIT License.
