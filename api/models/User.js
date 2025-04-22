const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        validator: function (v) {
          // Allow any combination of letters, numbers, and special characters
          return /^[\w\W]{6,}$/.test(v);
        },
        message: (props) =>
          "Password must be at least 6 characters long and can contain letters, numbers, and special characters",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
