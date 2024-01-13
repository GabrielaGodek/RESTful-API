# RESTful API

The project allowed for gaining experience in creating a fully functional RESTful API, understanding web application architecture, handling MongoDB database, and using TypeScript in the Node.js environment. The implemented advanced filtering enables efficient data manipulation according to user needs.

### Installation Guide

1. Clone this repository [here](https://github.com/GabrielaGodek/RESTful-API.git)
2. Run `npm run build` to install all dependencies and compile TypeScript code to JavaScript and create `dist` folder
3. Run `npm run start` to connect with MongoDB

### Usage

Connect to the API using Postman with address: `http://localhost:3000/api/v1/coffees/`

### API Endpoints

| HTTP   | Endpoints                                     | Action                                         |
| ------ | --------------------------------------------- | ---------------------------------------------- |
| POST   | /api/v1/coffees                               | To create new a coffee                         |
| GET    | /api/v1/coffees                               | To retrieve all available coffees              |
| GET    | /api/v1/coffees/:id                           | To retrieve details of a single coffee         |
| PATCH  | /api/v1/coffees/:id                           | To edit the details of a single coffee         |
| DELETE | /api/v1/coffees/:id                           | To delete a single coffee                      |
| GET    | /api/v1/coffees?price[lte]=11&name=Espresso   | To search specific coffee by values            |
| GET    | /api/v1/coffees?sort=price                    | To sort results by price                       |
| GET    | /api/v1/coffees?fields=name,description,price | To return only desired values not whole object |
| GET    | /api/v1/coffees?page=2&limit=5                | To display results with pagination             |
| GET    | /api/v1/coffees/bestsellers                   | Alias for 3 cheapest coffee                    |

Click here to see: [Postman Documentation](https://documenter.getpostman.com/view/29979715/2s9YXpWJpp) for this API

### Technologies

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

### Authors

Gabriela Godek

### License

This project is available for use under the MIT License.
