

const Static = require('../models/Static');
const { Op } = require("sequelize")


class DashController {

  async dashGET(req, res) {
    try {
      const startDate = new Date().toLocaleDateString('ru-Ru')
      const endDate = `${startDate.slice(0, 2) - 7}${startDate.slice(2)} `
      const get_static = await Static.findAll({
        where: {
          date: {
            [Op.between]: [endDate, startDate]
          }
        }
      })
      if (!get_static) {
        return res.status(400).json({
          message: "No date"
        })
      }
      res.render("pages/dasboard")

    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: e,
      })
    }
  }

  async area(req, res) {
    try {
      const area_get = await Static.findOne({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        message: area_get
      })

    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: e,
      })
    }
  }

  async datePOST(req, res) {
    try {
      const { startDate, endDate } = req.body
      const staticfilter = await Static.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate]
          }
        }
      })
      if (!staticfilter) {
        return res.status(400).json({
          message: "no Date"
        })
      }
      res.status(200).json({
        message: staticfilter
      })
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: e,
      })
    }
  }
}

module.exports = new DashController();