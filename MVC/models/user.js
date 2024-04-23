const mongoose = require("mongoose");


// schema structure
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

// schema model
const User = mongoose.model("user", userSchema);

module.exports = User;