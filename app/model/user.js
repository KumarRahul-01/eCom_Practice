const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Admin", "User"], default: "User" },
  password: { type: String, required: true },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
