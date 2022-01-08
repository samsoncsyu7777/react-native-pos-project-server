const express = require("express");
const router = express.Router();
const protectKey = require("../middleware/protectKey");
const protectToken = require("../middleware/protecttoken");
const protect = require("../middleware/auth");

const {
  registerUser,
  keyToken,
  loginUser,
  changePasskey
} = require("../controllers/auth");

router.route("/v1/user/register").post(protectToken, registerUser);

router.route("/v1/token").post(protectKey, keyToken);

router.route("/v1/user/access").post(protectToken, loginUser);

router.route("/v1/user/change-passkey").patch(protect, changePasskey);

module.exports = router;
