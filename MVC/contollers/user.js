const User = require("../models/user");

async function handleAllUser(req, res) {
  const allUser = await User.find({});
  return res.status(200).json(allUser);
}

async function handleUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  return res.json(user);
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "deleted" });
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.ip_address
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    ip: body.ip_address,
  });

  return res.status(201).json({ msg: "success" });
}

module.exports = {
  handleAllUser,
  handleUserById,
  handleDeleteUserById,
  handleCreateUser,
};
