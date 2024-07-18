
const jwt = require("jsonwebtoken");
const User = require("../models/User")


const middleCheckUser = async (req, res, next) => {
  try {
    const authHeader = req.headers['cookie']
    if (!authHeader) {
      return res.redirect('/auth/login')
    }
    const cookie = authHeader.split('=')[1]
    jwt.verify(cookie, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return res.redirect('/auth/login')
      }
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      if(!user){
        return res.redirect('/auth/login')
      }
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