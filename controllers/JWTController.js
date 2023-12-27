
const jwt = require("jsonwebtoken");


exports.JWTController = {


  createToken(email, role, refresh = false) {
    const payload = {
      email,
      role
    }
    return jwt.sign(payload, process.env.SECRET, {
      expiresIn: "24h",
    });

  }

}

