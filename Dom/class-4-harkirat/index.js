const express = require("express");
const PORT = 5000;
const cors = require("cors");
const app = express();

app.use(cors());
app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const sum = a + b;
  res.send(sum.toString());
});

app.listen(PORT, () => {
  console.log(`Sever started at port ${PORT}`);
});
