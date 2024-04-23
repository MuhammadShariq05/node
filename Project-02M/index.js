const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
// const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;

// connection to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/project-02-m")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("Mongo Error", err);
  });

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
  { timestamps: true } // adding time stamps gave me a time at which its created
);

// schema model
const User = mongoose.model("user", userSchema);

//middleware ~ Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

// dynamic route ~ GET /api/users/:id
app.get("/users/:id", async (req, res) => {
  // get id //now we have to find id in the json file.
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  return res.json(user);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // get id //now we have to find id in the json file.
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {})
  .delete(async (req, res) => {
    const del = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "deleted" });
  });

// Post - create new user
app.post("/api/users", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
 