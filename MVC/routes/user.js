const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  handleAllUser,
  handleUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../contollers/user");

router.route("/").get(handleAllUser).post(handleCreateUser);

router
  .route("/:id")
  .get(handleUserById)
  .patch(async (req, res) => {})
  .delete(handleDeleteUserById);

module.exports = router;
