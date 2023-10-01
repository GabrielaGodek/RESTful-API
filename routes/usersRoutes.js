import express from "express";

import {
  getAllUsers,
  getUser,
  createUser,
} from "./../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser);

export default router;
