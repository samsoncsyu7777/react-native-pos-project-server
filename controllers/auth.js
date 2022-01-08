const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const generateKey = require("../utils/generateKey");
const util = require('util');

// @route POST /api/v1/user/register
// @desc Register user
// @access Protect
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { operator, passkey } = req.body;

  const user = await User.create({
    operator,
    passkey,
  });

  if (user) {
    const token = generateToken(operator);

    res.status(201).json({
      token: token
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/v1/key-token
// @desc get key token
// @access Protect
exports.keyToken = asyncHandler(async (req, res, next) => {
  const token = generateKey(req.body.client);

  res.status(200).json({
    token: token
  });  
});

// @route POST /api/v1/user/access
// @desc Login user
// @access Protect
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { action, operator, passkey } = req.body;

  const user = await User.findOne({ operator });

  if (user && action === 'login' && (await user.matchPasskey(passkey))) {
    const token = generateToken(operator);
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route PATCH /api/v1/user/change-passkey
// @desc Change passkey
// @access Protect
exports.changePasskey = asyncHandler(async (req, res, next) => {
  const { passkey } = req.body;

  const user = await User.findOne({ operator: req.user.id });

  if (user) {
    user.passkey = passkey;
    user.save();
    res.status(200).json({
      user: user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid token");
  }
});