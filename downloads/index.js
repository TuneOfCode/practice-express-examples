"use strict";
const path = require("path");
const FILES_ROOT = path.join(__dirname, "files");

const downloads = (app) => {
  app.get("/downloads", (req, res) => {
    res.render("downloads/download");
  });

  app.get("/downloads/:file(*)", (req, res, next) => {
    const file = req.params.file;
    if (!file) return res.render("downloads/download");
    res.download(file, { root: FILES_ROOT }, (err) => {
      if (!err);
      res.status(400).json({ message: "Tải file thất bại!" });
      next();
    });
  });
};

module.exports = downloads;
