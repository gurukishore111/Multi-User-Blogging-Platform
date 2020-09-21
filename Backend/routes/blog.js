const express = require("express");
const {
  createBlog,
  listBlog,
  listAllBlogCT,
  readBlogs,
  removeBlogs,
  updateBlog,
  photo,
  listRelated,
  listSearch,
  listByUser,
} = require("../controllers/blog");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignIn,
  adminMiddleware,
  authMiddleware,
  canUpdateDeleteBlog,
} = require("../controllers/auth");

router.post("/blog", requireSignIn, adminMiddleware, createBlog);
router.get("/blogs", listBlog);
router.post("/blogs-categories-tags", listAllBlogCT);
router.get("/blog/:slug", readBlogs);
router.delete("/blog/:slug", requireSignIn, adminMiddleware, removeBlogs);
router.put("/blog/:slug", requireSignIn, adminMiddleware, updateBlog);
router.get("/blog/photo/:slug", photo);
router.post("/blogs/related", listRelated);
router.get("/blogs/search", listSearch);

//auth user blog part

router.post("/user/blog", requireSignIn, authMiddleware, createBlog);
router.delete(
  "/user/blog/:slug",
  requireSignIn,
  authMiddleware,
  canUpdateDeleteBlog,
  removeBlogs
);
router.get("/:username/blogs", listByUser);
router.put(
  "/user/blog/:slug",
  requireSignIn,
  authMiddleware,
  canUpdateDeleteBlog,
  updateBlog
);

module.exports = router;
