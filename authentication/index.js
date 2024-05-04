const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/auth_signin")

const User = mongoose.model("Users", {
  name: String,
  username: String,
  pasword: String,
});


const app = express();
app.use(express.json());

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  let userExists = false;
  for(let i = 0; i<ALL_USERS.length; i++){
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
      userExists = true;
    }
  }
  return userExists;
}

app.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const existUser = await User.findOne({email: username });
  if(existUser){
    return res.status(400).json("User doesnt exist");
  }

  const user = new User({
    name: name,
    email: username,
    password: password
  });

  user.save();
  res.json({
    "msg": "User created sucessfully"
  })
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
    return res.json({
      users: ALL_USERS
    })
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(PORT, ()=>{console.log(`Server started on port ${3000}`)})