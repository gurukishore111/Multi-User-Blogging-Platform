const { check } = require("express-validator");

exports.TagCreatevalidators = [
  check("name").not().isEmpty().withMessage("Name is required!"),
];
