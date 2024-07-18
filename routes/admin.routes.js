const express = require("express")
const routes = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const admin = require("../controllers/control.admin")

const { registerValidator } = require("../validators/registerValidator")


routes.get("/", admin.homeGET)
routes.get("/lister/:id/", admin.homeDEL)

routes.get("/users", admin.userGET)
routes.get("/user/del/:id/", admin.userDEL)
routes.post("/user",registerValidator, admin.userPOST)

routes.get("/static/:id/", admin.statiGET)
routes.get("/static/del/:id/", admin.staticDel)
routes.post("/static/form/", admin.staticPOST)
routes.post("/file/:id/", upload.single('file'), admin.file_post)



module.exports = routes