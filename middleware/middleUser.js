
const jwt = require("jsonwebtoken");
const User = require("../models/User")


const middleCheckUser = async (req, res, next) => {
  try {
    const authHeader = req.headers['cookie']
    if (!authHeader) {
      return res.status(404).json({
        message: "User sing in"
      })
    }
    const cookie = authHeader.split('=')[1]
    jwt.verify(cookie, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "This session has expired. Please login" });
      }
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      req.user = user.dataValues
      next()
    })

  } catch (e) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    })
  }

}

module.exports = middleCheckUser;