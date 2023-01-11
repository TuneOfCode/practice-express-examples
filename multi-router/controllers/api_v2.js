const api_v2 = require("express")();

api_v2.get("/users", (req, res) => {
  res.json({
    user_1: "John Smith",
    user_2: "Trần Thanh Tú",
  });
});

module.exports = api_v2;
