const express = require("express");
const zod = require("zod")

const app = express();
const PORT = 5000;

const schema = zod.array(zod.number());

app.use(express.json());
app.get("\kidney-check", (req, res)=>{
  // kidney = [1, 2]
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  res.json({
    response
  })
})

app.listen(PORT, ()=>{
  console.log(`listening from PORT ${PORT}`);
})