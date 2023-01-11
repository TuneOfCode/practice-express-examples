const api_v1 = require("./controllers/api_v1");
const api_v2 = require("./controllers/api_v2");

const multipleRouters = (app) => {
  app.use("/api/v1", api_v1);
  app.use("/api/v2", api_v2);
};

module.exports = multipleRouters;
