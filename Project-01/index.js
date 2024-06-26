const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;

//middleware ~ Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

app.use(express.urlencoded({ extended: true }));

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
  .delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user !== -1) {
      users.splice(user, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        if (err) {
          console.log("Error", err);
          res.status(500).send("Server error");
        } else {
          res.status(204).send("Delete");
        }
      });
    } else {
      res.status(404).send("User not found");
    }
  });

// Post - create new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.send("Error", err);
    } else {
      return res.status(201).json({ result: "sucess", id: users.length });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
