const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./app/config/db");
const app = express();
dotenv.config();
dbConnect();

app.use(express.json()); 

const userRouter=require('./app/router/userRouter');
app.use('/user', userRouter);

const productRouter= require('./app/router/productRouter');
app.use('/product', productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 8800;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
