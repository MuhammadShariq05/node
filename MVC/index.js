const express = require("express");
const userRouter = require("./routes/user");
const { connectMongo } = require("./connection/connect");

const app = express();
const PORT = 5000;

// connection to mongodb
connectMongo("mongodb://127.0.0.1:27017/project-MVC").then(() => {
  console.log("MongoDb connected");
});

// middleware
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
