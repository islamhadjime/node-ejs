
const express = require("express")
const router  = express.Router()


const { registerValidator } = require("../validators/registerValidator")
const { loginValidator } = require("../validators/loginValidator")
const { HomeController } = require("../controllers/control.register")


router.post("/register", registerValidator, HomeController.register)
router.post("/login", loginValidator, HomeController.login)
router.get("/logout", HomeController.logout)

module.exports = router

