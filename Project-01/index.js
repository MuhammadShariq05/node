const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;

//middleware
app.use(express.urlencoded({extended: true}))

app.get("/users", (req, res) => {
  return res.json(users);
});

// dynamic route ~ GET /api/users/:id
app.get("/users/:id", (req, res) => {
  // get id
  const id = Number(req.params.id);
  //now we have to find id in the json file.
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    // get id
    const id = Number(req.params.id);
    //now we have to find id in the json file.
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {})
  .delete((req, res) => {});

// Post - create new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({...body, id: users.length +1});
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err, data) => {
    if(err){
      return res.send("Error", err);
    } else{
      return res.json({result: "sucess", id: users.length})
    }
  })
});

app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
