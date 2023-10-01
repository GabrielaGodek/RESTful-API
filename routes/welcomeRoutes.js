import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(`<h1 style="font-family: Trebuchet MS; text-align: center">RESTful API with NodeJS & Express and MongoDB</h1>
  <p style="font-family: Trebuchet MS;text-align: center">It power two applications: <br>
✨ LazyCup<br>
✨ Custom CMS for updating available list of coffees</p>
<div style="text-align: center">
<h2 style="font-family: Trebuchet MS">Available endpoints</h2>
<ul style="list-style: none">
<li>GET /coffees</li>
<li>GET /coffees/:id</li>
<li>POST /coffees</li>
<li>PATCH /coffees/:id</li>
<li>DELETE /coffees/:id</li>
<br>
<li>GET /users</li>
<li>GET /users/:id</li>
<li>POST /users</li>
</ul>
</div>
`);
});

export default router;
