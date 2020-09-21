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
const { create, list, removes, read } = require("../controllers/tag");

router.post(
  "/tag",
  CategoryCreatevalidators,
  runValidation,
  requireSignIn,
  adminMiddleware,
  create
);

router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignIn, adminMiddleware, removes);

module.exports = router;
