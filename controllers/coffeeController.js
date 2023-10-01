import { Coffee } from "../models/coffeeModel.js";

const getAllCoffees = async (req, res) => {
  const coffees = await Coffee.find();
  try {
    res.status(200).json({
      status: "success",
      data: { coffees },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const getCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);
    if (!coffee) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: { coffee },
    });
  } catch (err) {
    console.log(`Upsik:: getCoffee func | ${err}`);
  }
};
const createCoffee = async (req, res) => {
  const newCoffee = new Coffee(req.body);
  try {
    await newCoffee.save();
    res.status(201).json({
      status: "success",
      data: {
        coffee: newCoffee,
      },
    });
  } catch (err) {
    console.log(`Upsik:: createCoffee func | ${err}`);
  }
};
const updateCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    await coffee.save();
    res.status(200).json({
      status: "success",
      data: {
        coffee,
      },
    });
  } catch (err) {
    console.log(`Upsik:: updateCoffee func | ${err}`);
  }
};
const deleteCoffee = async (req, res) => {
  try {
    await Coffee.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(`Upsik:: deleteCoffee func | ${err}`);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export { getAllCoffees, getCoffee, createCoffee, updateCoffee, deleteCoffee };
