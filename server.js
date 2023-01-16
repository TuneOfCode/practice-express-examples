"use strict";

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const port = 2222;

// import modules
const auth = require("./auth");
const contentNegotiator = require("./content-negotiation");
const cookieSessionFn = require("./cookie-sessions");
const cookies = require("./cookies");
const downloads = require("./downloads");
const multipleRouters = require("./multi-router");
const multipartFn = require("./multipart");
const mvc = require("./mvc");
const onlineFn = require("./online");

// view engine configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(cookieSession({ secret: "secret", httpOnly: true }));
app.use(
  session({
    resave: false, // chưa lưu nếu chưa được sửa
    saveUninitialized: false, // không tạo phiên cho đến khi được lưu trữ
    secret: "secret",
  })
);

// routers
auth(app);
contentNegotiator(app);
cookieSessionFn(app);
cookies(app);
downloads(app);
multipleRouters(app);
multipartFn(app);
mvc(app);
onlineFn(app);

app.use("/*", (req, res, next) => {
  res.status(400).json({
    message: "Not found",
  });
});
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
