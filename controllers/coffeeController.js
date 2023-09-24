import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync, writeFile } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const coffees = JSON.parse(readFileSync(`${__dirname}/../data/db.json`));

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

export { getAllCoffees, getCoffee, createCoffee, updateCoffee, deleteCoffee };
