const bcrypt = require("bcrypt");


const User = require("../models/User");
const { JWTController } = require("./JWTController")


exports.HomeController = {

  async register(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: "User account already exists" } });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10)

      const newUser = await User.create({
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });


      res.status(200).json({
        data: {
          user: newUser
        }
      })

    } catch (e) {
      console.log(e);
      next(e)
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
    const validPassword = bcrypt.compareSync(req.body.password, user.password)
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
    res.status(200).json({
      data: {
        token: token.access_token,
        user: user
      }
    })
  },

  async logout(req, res) {
    try {
      res.clearCookie("SessionID");
      res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }



}