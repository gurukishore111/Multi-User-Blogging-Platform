const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      max: 162,
      min: 3,
      tim: true,
    },
    slug: {
      type: String,
      index: true,
      unique: true,
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    mtitle: {
      type: String,
    },
    mdesc: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: ObjectId, ref: "Category", required: true }],
    tags: [{ type: ObjectId, ref: "Tag", required: true }],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Blogs", BlogSchema);
