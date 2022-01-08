const jwt = require("jsonwebtoken");

const generateKey = (id) =>
  jwt.sign(
    {
      id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  );

module.exports = generateKey;
