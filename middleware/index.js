const express = require("express");
const zod = require("zod")

const app = express();
const PORT = 5000;

const schema = zod.array(zod.number());

app.use(express.json());
app.post("/kidneys", (req, res)=>{
  // kidney = [1, 2]
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
    
  if(!response.success){
    res.status(411).json({
      msg : "Invalid input"
    })
  }else{
  res.json({
    response
  })
  }
})

app.listen(PORT, ()=>{
  console.log(`listening from PORT ${PORT}`);
})