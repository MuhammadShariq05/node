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

// app.use(middle ware)... will says the whole app that it will use this middle ware, so we can use it andremove the individual function we had defined inthe get function

app.use(isOldEnoughMiddleware);
app.get("/ride1", function(req, res){
  res.json({
    msg: "Ridden ride 1"
  })
})

app.get("/ride2", function(req, res){
  res.json({
    msg: "Ridden ride 2"
  })
})

app.get("/ride3", function(req, res){
  res.json({
    msg: "Ridden ride 3"
  })
})

app.listen(PORT, ()=>{
  console.log(`listening from PORT ${PORT}`);
})