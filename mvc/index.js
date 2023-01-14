"use strict";
const courseController = require("./controllers/course.controller");
const mvc = (app) => {
  app.get("/courses", courseController.getCourses);
  app.get("/course/:courseId/detail", courseController.getCourse);
  app.post("/courses", courseController.createCourse);
  app.post("/courses/:courseId/edit", courseController.updateCourse);
  app.get("/courses/:courseId/destroy", courseController.destroyCourse);
};

module.exports = mvc;
