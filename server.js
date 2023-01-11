"use strict";

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const port = 2222;

// import modules
const auth = require("./auth");

// view engine configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false, // chưa lưu nếu chưa được sửa
    saveUninitialized: false, // không tạo phiên cho đến khi được lưu trữ
    secret: "secret",
  })
);

// routers
auth(app);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
