"use strict";
const brycpt = require("bcrypt");

// config password
const salt = brycpt.genSaltSync(10);
const hashPassword = brycpt.hashSync("123", salt);

// fake data
const userdb = {
  username: "Yến",
  password: hashPassword,
};

const auth = (app) => {
  // middleware show message of session error and success
  app.use((req, res, next) => {
    const error = req.session.error;
    const success = req.session.success;
    delete req.session.error;
    delete req.session.success;

    res.locals.err = "";
    res.locals.success = "";

    if (error) res.locals.err = `<p class='error'>${error}</p>`;
    if (success) res.locals.success = `<p class='success'>${success}</p>`;
    next();
  });

  // [GET:login] login html
  app.get("/login", (req, res) => {
    res.render("auth/login");
  });

  // middleware validation empty
  function validateEmpty(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      req.session.error = "Bạn chưa nhập đủ tài khoản hoặc mật khẩu!";
      return res.redirect("/login");
    }
    next();
  }

  // [POST:login] data from client to server
  app.post("/login", validateEmpty, (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const isCheckPassword = brycpt.compareSync(password, userdb.password);
    console.log("===> isCheckPassword: ", isCheckPassword);
    if (username === userdb.username && isCheckPassword) {
      req.session.userlogin = userdb.username;
      req.session.success = `
        <h1 class='center'>Chào mừng, ${userdb.username}!</h1>
        <br />`;
      return res.redirect("/welcome");
    } else {
      req.session.error =
        "Tài khoản hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại.";
      return res.redirect("/login");
    }
  });

  // [GET:welcome]
  app.get("/welcome", (req, res) => {
    if (!req.session.userlogin) return res.redirect("/login");
    return res.render("auth/welcome");
  });

  // [GET:logout]
  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      return res.redirect("/login");
    });
  });
};

module.exports = auth;
