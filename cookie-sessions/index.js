"use strict";

const cookieSessionFn = (app) => {
  app.get("/cookie-sessions", (req, res) => {
    req.session.coin = (req.session.coin || 0) + 1;
    res.send(`total coin: ${req.session.coin} $`);
  });
};

module.exports = cookieSessionFn;
