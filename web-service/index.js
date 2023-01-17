"use strict";

const error = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const success = (res, data) => {
  return res.status(200).json({
    statusCode: 200,
    data,
  });
};

const APIKeys = ["abcd", "1234", "ABCD"];
const names = [{ name: "user_1" }, { name: "user_2" }];
const languages = [
  {
    id: 1,
    name: "PHP",
  },
  {
    id: 2,
    name: "Java",
  },
  {
    id: 3,
    name: "Python",
  },
  {
    id: 4,
    name: "Javascript",
  },
  {
    id: 5,
    name: "C#",
  },
];

const webService = (app) => {
  // middleware check api key
  app.use("/web-service/api", (req, res, next) => {
    const apiKey = req.query["apiKey"];

    if (!apiKey) return next(error(400, "API key required"));

    if (APIKeys.indexOf(apiKey) === -1)
      return next(error(401, "Invalid API key"));

    req.apiKey = apiKey;
    next();
  });

  // resources
  app.get("/web-service/api/names", (req, res) => {
    success(res, names);
  });
  app.get("/web-service/api/languages", (req, res) => {
    success(res, languages);
  });

  // catch errors
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    res.status(errorStatus);
    return res.json({
      statusCode: errorStatus,
      message: err.message || "Internal Server Error",
    });
  });
};

module.exports = webService;
