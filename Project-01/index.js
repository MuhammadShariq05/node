const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;

app.get("/users", (req, res) => {
  return res.json(users);
})

// dynamic route ~ GET /api/users/:id 
app.get("/users/:id",(req, res) =>{
  // get id
  const id = Number(req.params.id);
  //now we have to find id in the json file.
  const user = users.find((user) => user.id === id);
  return res.json(user);
})

app.listen(PORT, () => {console.log(`Server started at Port ${PORT}`)});