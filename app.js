var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

// Import Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// const authRouter = require("./routes/auth");
const registroRouter = require("./routes/registro");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes Middleware
app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/auth", authRouter);
app.use("/registro", registroRouter);

module.exports = app;
