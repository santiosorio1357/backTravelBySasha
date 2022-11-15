const jwt = require("jsonwebtoken");

const SECRET_KEY = "88a92e679365e27ca8c029ed35f05c63cccc1b19";

const createJsonWebToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw "ERROR VERIFICANDO TOKEN";
  }
};

module.exports = { createJsonWebToken, verifyToken };
