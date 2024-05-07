const express = require("express");

const app = express();
const PORT = 5000;

// middle ware use

function isOldEnoughMiddleware(req, res, next){
  const age = req.query.age;
  if(age >= 14){
    next();
  }else{
    res.status(411).json({
      msg: "Access denied, age is less than 14"
    });
  }
}

app.get("/ride1", isOldEnoughMiddleware, function(req, res){
  res.json({
    msg: "Ridden ride 1"
  })
})

app.get("/ride2", isOldEnoughMiddleware, function(req, res){
  res.json({
    msg: "Ridden ride 2"
  })
})

app.get("/ride3", isOldEnoughMiddleware, function(req, res){
  res.json({
    msg: "Ridden ride 3"
  })
})

app.listen(PORT, ()=>{
  console.log(`listening from PORT ${PORT}`);
})