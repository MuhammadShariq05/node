const http = require("http");
const express = require("express");;

const app = express();

//syntax for express handler ~ "app.METHOD(path, HANDLER)"
app.get("/", (req, res) => {
  res.send("Homepage");
})

app.get("/about", (req, res) => {
  const username = req.query.username;
  res.send(`Hi, i am ${username} developer`);
})

app.listen(8000, () => {console.log("Server started")})