const express = require("express")
const router  = express.Router()

const dashboard = require('../controllers/control.dash')


router.get("/", dashboard.dashGET)
router.get('/arey/:id/',dashboard.area)
router.post('/date',dashboard.datePOST)


module.exports = router


