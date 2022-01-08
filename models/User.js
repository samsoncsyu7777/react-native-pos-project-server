const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
    unique: true,
  },
  passkey: {
    type: String,
    required: true,
  },
});

userSchema.methods.matchPasskey = async function (enteredPasskey) {
  return await bcrypt.compare(enteredPasskey, this.passkey);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("passkey")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.passkey = await bcrypt.hash(this.passkey, salt);
});

module.exports = User = mongoose.model("User", userSchema);
