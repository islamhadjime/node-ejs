
const express = require("express")
const router  = express.Router()



const { loginValidator } = require("../validators/loginValidator")
const { HomeController } = require("../controllers/control.register")

router.get("/login",  HomeController.loginGET)
router.post("/login", loginValidator, HomeController.login)
router.get("/logout", HomeController.logout)

module.exports = router

