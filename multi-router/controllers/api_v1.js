const api_v1 = require("express")();

api_v1.get("/users", (req, res) => {
  res.json({
    user_1: "John Smith",
  });
});

module.exports = api_v1;
