const { check } = require("express-validator");

exports.CategoryCreatevalidators = [
  check("name").not().isEmpty().withMessage("Name is required!"),
];
