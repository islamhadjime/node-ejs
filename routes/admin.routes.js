const express = require("express")
const routes = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const admin = require("../controllers/control.admin")




routes.get("/", admin.homeGET)
routes.get("/edit/", admin.edit)
routes.get("/static/:id/", admin.static_get)
routes.post("/static/", admin.static_post)
routes.post("/file/:id/", upload.single('file'), admin.file_post)



module.exports = routes