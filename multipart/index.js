"use strict";

const util = require("util");
const multipart = require("multiparty");

const multipartFn = (app) => {
  // [GET] upload ejs
  app.get("/uploads", (req, res) => {
    res.render("multipart/upload");
  });

  // [POST] upload
  app.post("/uploads", (req, res) => {
    // 1
    const form = new multipart.Form();
    let field;
    let image = {
      filename: "",
      size: 0,
    };

    // process event get title
    form.on("field", (name, value) => {
      if (name === "") return;
      field = value;
    });
    // process event get file
    form.on("part", (file) => {
      if (!file.filename) return file.resume();
      image.filename = file.filename;
      image.size = 0;
      file.on("data", (buf) => {
        image.size += buf.length;
      });
    });
    // throw error
    form.on("error", (err) => {
      return res.status(400).json({
        message: err.stack,
      });
    });
    // process event close
    form.on("close", () => {
      const message = util.format(
        "uploaded %s (%d Kb) of %s",
        image.filename,
        image.size / 1024 || 0,
        field
      );
      res.setHeader("Content-Type", "text/plain");
      res.json({ message });
    });
    // parse request
    form.parse(req);

    // // 2
    // form.parse(req, (err, fields, files) => {
    //   if (err) return;

    //   res.json({ fields, upload_files: files });
    // });
  });
};

module.exports = multipartFn;
