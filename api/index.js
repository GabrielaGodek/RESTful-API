/**
 * ORDER IN EXPRESS IS ESSENTIAL!
 */
import express from "express";
import morgan from "morgan";
import { readFileSync, writeFile } from "fs";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

const coffees = JSON.parse(readFileSync("../data/db.json"));

const getAllCoffees = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: coffees.length,
    data: { coffees },
  });
};
const getCoffee = (req, res) => {
  console.log(req.params);

  const id = Number(req.params.id);
  const coffee = coffees.find((el) => el.id === id);

  if (!coffee) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({ status: "success", data: { coffee } });
};
const createCoffee = (req, res) => {
  // console.log(req.body)

  const newID = coffees[coffees.length - 1].id + 1;
  const newCoffee = Object.assign({ id: newID }, req.body);

  coffees.push(newCoffee);
  writeFile("../data/db.json", JSON.stringify(coffees), (err) => {
    res.status(201).json({
      status: "success",
      data: newCoffee,
    });
  });
};
const updateCoffee = (req, res) => {
  const id = Number(req.params.id);
  const coffee = coffees.find((el) => el.id === id);

  if (!coffee) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      coffee,
    },
  });
};
const deleteCoffee = (req, res) => {
  const id = Number(req.params.id);
  const coffee = coffees.find((el) => el.id === id);

  if (!coffee) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
// users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "err",
    msg: "This route is not yet defined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "err",
    msg: "This route is not yet defined",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "err",
    msg: "This route is not yet defined",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "err",
    msg: "This route is not yet defined",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "err",
    msg: "This route is not yet defined",
  });
};

app.route("/api/v1/coffees").get(getAllCoffees).post(createCoffee);
app
  .route("/api/v1/coffees/:id")
  .get(getCoffee)
  .patch(updateCoffee)
  .delete(deleteCoffee);

app.route("/api/v1/users").get(getAllUsers).post(createUser);
app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
