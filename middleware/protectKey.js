const jwt = require("jsonwebtoken");
const util = require('util');

const protectKey = (req, res, next) => {
  const token = req.body.key;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.id === req.body.client && req.body.action === "authenticate") {
      next();
    } else {
      res.status(401).send("Token is not valid");
    }
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = protectKey;
