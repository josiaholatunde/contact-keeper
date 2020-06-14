const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const generateToken = async (user) => {
  try {
    const userPayload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };
    return await jwt.sign(userPayload, jwtSecret, { expiresIn: "1h" });
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = generateToken;
