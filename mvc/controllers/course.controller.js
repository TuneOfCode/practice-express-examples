"use strict";

const courseModel = require("../models/course.model");

class CourseController {
  getCourses(req, res) {
    const courses = courseModel.readCourses();
    res.render("mvc/show-course", { courses, title: "Trang chủ" });
  }

  getCourse(req, res) {
    const courseId = req.params.courseId;
    const course = courseModel.readCourse(courseId);
    res.render("mvc/show-detail-course", {
      course,
      title: `Trang chi tiết khoá học `,
    });
  }

  createCourse(req, res) {
    if (!req.body) return res.redirect("/courses");
    const { courseId, name, quantity, price, unit, thumbnailUrl } = req.body;
    const newCourse = { courseId, name, quantity, price, unit, thumbnailUrl };
    console.log("===> newCourse: ", newCourse);
    courseModel.createCourse(newCourse);
    return res.redirect("/courses");
  }

  updateCourse(req, res) {
    const courseId = req.params.courseId;
    if (!courseId || !req.body) return res.redirect("/courses");
    const { name, quantity, price, unit, thumbnailUrl } = req.body;
    const editCourse = { courseId, name, quantity, price, unit, thumbnailUrl };
    courseModel.updateCourse(editCourse, courseId);
    console.log("===> editCourse: ", editCourse);
    return res.redirect("/courses");
  }

  destroyCourse(req, res) {
    const courseId = req.params.courseId;
    if (!courseId) return res.redirect("/courses");
    courseModel.destroyCourse(courseId);
    return res.redirect("/courses");
  }
}

module.exports = new CourseController();
