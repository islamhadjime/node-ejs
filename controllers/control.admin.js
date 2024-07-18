
const bcryptjs = require("bcryptjs");
const readEXL = require("../helpers/XLS.read")
const dateResult = require("../helpers/date")
const checkData = require("../utils/promis_check_data")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { Op } = require('sequelize')
const sequelize = require('../dbconfig');
const fs = require("fs")


const Static = require('../models/Static');
const TitleStatic = require("../models/TitleStatic")
const User = require("../models/User")



class ControlAdmin {

  async homeGET(req, res) {
    try {
      const lister = await TitleStatic.findAll()
      res.render('pages/admin', {
        layout: 'edit',
        active:true,
        lister:lister
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
  async homeDEL(req,res) {
    try {
      await TitleStatic.destroy({
        where:{
          id:req.params.id
        }
      })
      res.redirect('/admin/')
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: e,
      })
    }
  }
  async statiGET(req, res) {
    try {
      const lister = await TitleStatic.findAll()
      const titleStatic = await TitleStatic.findOne({
        where: {
          id: req.params.id
        }
      })
      const data_static = await Static.findAll({
        group:"indeficator",
        where:{
          TitleStaticId:titleStatic.id
        },
        attributes:[
          "formattedStartDate",
          "formattedEndDate",
          "indeficator",
          "date",
          [sequelize.fn('COUNT', sequelize.literal('DISTINCT "lessons"')), 'srt_lessons'],
          [sequelize.fn('COUNT', sequelize.literal('DISTINCT "issuance"')), 'srt_issuance'],
          [sequelize.fn('COUNT', sequelize.literal('DISTINCT "those"')), 'srt_those'],
          [sequelize.fn('COUNT', sequelize.literal('DISTINCT "maintaining"')), 'srt_maintaining'],
          [sequelize.fn('COUNT', sequelize.col('name')), 'school'],
      ]
      })
      if (!data_static) {
        return res.status(400).json({
          message: "No StaticTitle"
        })
      }
      res.render("pages/admin",{
        layout: "static",
        data:data_static,
        lister:lister,
        titleStatic:titleStatic.title,
        id_lister:titleStatic.id
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
  async staticDel(req,res) {
    try {

      const statLight = await Static.findAll({
        where:{
          indeficator:req.params.id
        }
      })
      for (let i = 0; i < statLight.length; i++) {
        await statLight[i].destroy({
          where:{
            indeficator:req.params.id
          }
        })
      }
      res.redirect(`/admin/static/${statLight[0].TitleStaticId}`)
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: e,
      })
    }
  }
  async staticPOST(req, res) {
    try {
      const { 
          title, 
          min_check,
          srt_check,
          max_check,
          min,
          srt,
          max } = req.body
      await TitleStatic.create({
        title: title,
        min_color:min_check,
        srt_color:srt_check,
        max_color:max_check,
        min:min,
        srt:srt,
        max:max,
        date: new Date().toLocaleDateString('ru-Ru'),
      })
      res.status(200).redirect("/admin/")
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
      const indeficator = Math.floor(Math.random() * 10000);
      const {formattedStartDate,formattedEndDate } = dateResult(req.body.date);
      const check = await checkData(formattedStartDate,formattedEndDate,name_static.id)
      if(check.length > 0  ){
        return res.status(400).json({
          message: "Error file"
        })
      }
      await Static.bulkCreate(data.map(item => ({
        indeficator:indeficator,
        date: new Date().toLocaleDateString('ru-Ru'),
        ...item,
        formattedStartDate:formattedStartDate,
        formattedEndDate:formattedEndDate,
        TitleStaticId: name_static.id
      })))
      // После записи удаляю файл
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      })
      res.redirect(`/admin/static/${name_static.id}`)
    } catch (e) {
      res.status(500).json({
        status: e,
        code: 500,
        data: [],
        message: "Internal Server Error",
      })
    }
  }
  async userGET(req, res) {
    try {
      const lister = await TitleStatic.findAll()
      const users = await User.findAll()
      res.render('pages/admin', {
        layout: 'user',
        lister:lister,
        users:users
      })
      res.render("pages/admin",{
        layout: "user",
        lister:lister,
        users:users
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
  async userDEL(req,res) {
    try {
      await User.destroy({
        where:{
          id:req.params.id
        }
      })

      res.redirect('/admin/users')
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      })
    }
  }
  async userPOST(req, res, next) {
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

      const hashedPassword = bcryptjs.hashSync(req.body.password, 10)

      await User.create({
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });


      res.redirect("/admin/users")

    } catch (e) {
      console.log(e);
      next(e)
    }

  }

  async filePathStatic(req,res){
    
  }

}

module.exports = new ControlAdmin()
