"use strict";

// fake data in database
const languages = [
  {
    id: 1,
    name: "Python",
  },
  {
    id: 2,
    name: "JavaScript",
  },
  {
    id: 3,
    name: "Java",
  },
  {
    id: 4,
    name: "C#",
  },
];
const contentNegotiator = (app) => {
  app.get("/content-negotiator", (req, res) => {
    const htmls = languages
      .map((language) => {
        return `<li id='${language.id}'>${language.name}</li>`;
      })
      .join("");

    res.format({
      html: () => {
        res.send(`<ul>${htmls}</ul>`);
      },

      json: () => {
        res.json({
          message: "success",
          data: languages,
        });
      },
    });
  });
};

module.exports = contentNegotiator;
