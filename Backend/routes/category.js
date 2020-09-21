const express = require("express");
const {
  signup,
  signin,
  signout,
  requireSignIn,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
const { CategoryCreatevalidators } = require("../validator/category");
const router = express.Router();
//Validators
const { runValidation } = require("../validator");
const { create, list, removes, read } = require("../controllers/category");

router.post(
  "/category",
  CategoryCreatevalidators,
  runValidation,
  requireSignIn,
  adminMiddleware,
  create
);

router.get("/categories", list);
router.get("/category/:slug", read);
router.delete("/category/:slug", removes);

module.exports = router;
