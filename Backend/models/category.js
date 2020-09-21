const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    slug: {
      type: String,
      index: true,
      unique: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Category", categorySchema);
