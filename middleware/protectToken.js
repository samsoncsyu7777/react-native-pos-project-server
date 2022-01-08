const jwt = require("jsonwebtoken");
const util = require('util');

const protectToken = (req, res, next) => {
  const token = req.header('authorization').substring(7);

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.client = decoded;

    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = protectToken;
