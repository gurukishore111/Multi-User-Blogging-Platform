const express = require("express");
const {
  signup,
  signin,
  signout,
  requireSignIn,
  googleLogin,
} = require("../controllers/auth");
const router = express.Router();

//Validators

const { runValidation } = require("../validator");
const {
  userSignUpValidator,
  userSignInValidator,
} = require("../validator/auth");

router.post("/signup", userSignUpValidator, runValidation, signup);
router.post("/signin", userSignInValidator, runValidation, signin);
router.get("/signout", signout);
router.post("/google-login", googleLogin);

//test

// router.get("/secret", requireSignIn, (req, res) => {
//   res.json({
//     user: req.user,
//   });
// });

module.exports = router;
