"use strict";

class CourseModel {
  constructor(courses) {
    this.courses = courses || [];
  }

  createCourse(newCourse) {
    this.courses.push(newCourse);
  }

  readCourses() {
    return this.courses;
  }

  readCourse(courseId) {
    const course = this.courses.find((course) => course.courseId === courseId);
    return course;
  }

  updateCourse(editCourse, courseId) {
    const index = this.courses.findIndex(
      (course) => course.courseId === courseId
    );
    this.courses[index] = editCourse;
  }

  destroyCourse(courseId) {
    const index = this.courses.findIndex(
      (course) => course.courseId === courseId
    );
    this.courses.splice(index, 1);
  }
}

module.exports = new CourseModel([
  {
    courseId: "HCJ",
    name: "HTML-CSS-JS cơ bản",
    quantity: 20,
    price: "100",
    unit: "usd",
    thumbnailUrl:
      "https://nentang.vn/wp-content/uploads/2018/07/html-css-js-course-intro.jpeg",
  },
  {
    courseId: "PHP",
    name: "Học lập trình PHP",
    quantity: 12,
    price: "200",
    unit: "usd",
    thumbnailUrl:
      "https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/co-nen-hoc-lap-trinh-web-bang-php-02.jpg",
  },

  {
    courseId: "JS",
    name: "Lập trình Javascript căn bản và nâng cao",
    quantity: 50,
    price: "500",
    unit: "usd",
    thumbnailUrl:
      "https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png",
  },

  {
    courseId: "RJS",
    name: "Khoá học ReactJS",
    quantity: 30,
    price: "800000",
    unit: "vnđ",
    thumbnailUrl:
      "https://wiki.tino.org/wp-content/uploads/2021/09/pasted-image-0.png",
  },
]);
