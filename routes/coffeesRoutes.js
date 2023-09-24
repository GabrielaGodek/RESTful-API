import express from "express";
import {
  getAllCoffees,
  getCoffee,
  createCoffee,
  updateCoffee,
  deleteCoffee,
} from "./../controllers/coffeeController.js";

const router = express.Router();
router.route('/').get(getAllCoffees).get(createCoffee);
router.route('/:id').get(getCoffee).get(updateCoffee).get(deleteCoffee);

export default router;
