const express = require("express");
const bodyParser = require("body-parser");
// const userController = require("../backend/Controllers/user.controllers");
const { port, uri } = require("./config/vars");
const userRouter = require("../book-shelf-backend/Routes/user.routes");
const bookRouter = require("../book-shelf-backend/Routes/newBook.router");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    //  [
    //     'http://localhost:3000',
    //     'http://localhost:3001',
    // ], // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.set("view engine", "ejs");
app.use(userRouter);
app.use(bookRouter);
app.use('/uploads', express.static('uploads'));


async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("database connected");
  } catch (error) {
    console.log(error.message, "this is error");
    throw error;
  }
}
connect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
