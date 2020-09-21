const express = require("express");
const {
  signup,
  signin,
  signout,
  requireSignIn,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
const { read, publicProfile, update, photo } = require("../controllers/users");
const router = express.Router();
//Validators

router.get("/user/profile", requireSignIn, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignIn, authMiddleware, update);
router.get("/user/photo/:username", photo);
//test

// router.get("/secret", requireSignIn, (req, res) => {
//   res.json({
//     user: req.user,
//   });
// });

module.exports = router;
