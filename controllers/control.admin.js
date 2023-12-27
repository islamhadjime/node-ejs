

const readEXL = require("../helpers/XLS.read")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { Op } = require('sequelize')
const fs = require("fs")


const Static = require('../models/Static');
const TitleStatic = require("../models/TitleStatic")


class ControlAdmin {

  async homeGET(req, res) {
    try {
      res.render('pages/admin')
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: e,
      })
    }
  }

  async edit(req, res) {
    try {
      res.status(200).json({
        message: "static"
      })
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      })
    }
  }

  async static_get(req, res) {
    try {
      const getter_static = await TitleStatic.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!getter_static) {
        return res.status(400).json({
          message: "No StaticTitle"
        })
      }
      res.status(200).json({
        message: getter_static
      })
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      })
    }
  }

  async static_post(req, res) {
    try {
      const { title, desc } = req.body
      const creaStatic = await TitleStatic.create({
        title: title,
        desc: desc
      })

      res.status(200).json({
        message: creaStatic
      })
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      })
    }
  }

  async file_post(req, res) {
    try {
      const name_static = await TitleStatic.findOne({
        where: {
          id: req.params.id
        }
      })
      console.log(name_static.id);
      if (!name_static) {
        return res.status(400).json({
          message: "No StaticTitle"
        })
      }

      const data = readEXL(req.file.path)
      if (!data) {
        return res.status(400).json({
          message: "Error file"
        })
      }
      const a = await Static.bulkCreate(data.map(item => ({
        date: new Date().toLocaleDateString('ru-Ru'),
        ...item,
        TitleStaticId: name_static.id
      })))
      // После записи удаляю файл
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      })
      res.status(200).json({
        message: "a"
      })
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      })
    }
  }

}

module.exports = new ControlAdmin()
