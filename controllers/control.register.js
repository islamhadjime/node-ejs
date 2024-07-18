const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { JWTController } = require("./JWTController")


exports.HomeController = {

  async loginGET(req,res){
    try {
      res.render('pages/login', {})
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      })
    }
  },
  async login(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      return res.status(404).json({
        message: "Plise register"
      })
    }
    const validPassword = bcryptjs.compareSync(req.body.password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: `Введен неверный пароль` })
    }
    const token = JWTController.createToken(user.email, user.role)
    res.cookie("SessionID", token, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    res.redirect("/")
  },
  async logout(req, res) {
    try {
      res.clearCookie("SessionID");
      res.redirect("/auth/login")
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }


}