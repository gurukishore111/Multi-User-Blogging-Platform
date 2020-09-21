const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    profile: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
    },
    about: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetpasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamp: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    //temp variables
    this._password = password;
    //gen salt
    this.salt = this.makeSalt();
    //encrypt-pass
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
