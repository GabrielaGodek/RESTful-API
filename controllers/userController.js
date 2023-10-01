import { User } from "./../models/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (err) {
    res.status(500).json({
      status: "err",
      msg: `Upsik:: getAllUsers func | ${err}`,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(500).json({
      status: "err",
      msg: `Upsik:: getUser func | ${err}`,
    });
  }
};
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save()
    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "err",
      msg: `Upsik:: createUser func | ${err}`,
    });
  }
};

export { getAllUsers, getUser, createUser };
