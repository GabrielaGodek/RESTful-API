import express from "express";
import {
  getAllCoffees,
  getCoffee,
  createCoffee,
  updateCoffee,
  deleteCoffee,
} from "./../controllers/coffeeController.js";

const router = express.Router();
router.route("/").get(getAllCoffees).post(createCoffee);
router.route("/:id").get(getCoffee).patch(updateCoffee).delete(deleteCoffee);

export default router;
