const express = require("express")
const router = express.Router()

const dashboard = require('../controllers/control.dash')


router.get("/", dashboard.dashGET)
router.get("/detail/:id", dashboard.dashIdGet)
router.get("/mapsget/:id/", dashboard.mapsGet)


module.exports = router


