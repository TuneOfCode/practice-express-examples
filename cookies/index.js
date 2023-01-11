"use strict";

const cookies = (app) => {
  app.get("/cookies", (req, res) => {
    const rememberCookie = req.cookies.remember;
    if (!rememberCookie) return res.render("cookies/remember");
    return res.render("cookies/forgot");
  });

  app.post("/cookies-remember", (req, res) => {
    if (req.body.remember) {
      res.cookie("remember", "value", {
        httpOnly: true,
        maxAge: 3600 * 24 * 60,
      });
    }
    return res.redirect("/cookies");
  });

  app.get("/cookies-forgot", (req, res) => {
    res.clearCookie("remember");
    res.redirect("/cookies");
  });
};

module.exports = cookies;
