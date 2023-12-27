const express = require("express")
const routes  = express.Router()
const multer  = require('multer');
const upload  = multer({ dest: 'uploads/' });

const admin   = require("../controllers/control.admin")




routes.get("/",admin.home_get )
routes.post("/file",upload.single('file') ,admin.file_post)



module.exports = routes