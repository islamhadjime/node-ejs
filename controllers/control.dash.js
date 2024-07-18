

const Static = require('../models/Static');
const TitleStatic = require('../models/TitleStatic');
const dateResult = require("../helpers/date")


class DashController {

  async mapsGet(req,res){
    try {
      let startDate = undefined
      let endDate = undefined

      const listerId = await TitleStatic.findOne({
        where:{
          id:req.params.id
        }
      })

      if(!req.query.startDate && !req.query.endDate) {
        const get_data = await Static.findOne({
          where: {
            TitleStaticId:listerId.id,
          }
        })
        startDate = get_data.formattedStartDate
        endDate = get_data.formattedEndDate
      }else {
        startDate = req.query.startDate
        endDate = req.query.endDate
      }

  

      const get_static = await Static.findAll({
        where: {
          TitleStaticId:listerId.id,
          formattedStartDate:startDate.trim(),
          formattedEndDate:endDate.trim()
        }
      })


      res.status(200).json({
        data:get_static,
        dateRepert:{
          minColor:listerId.min_color,
          srtColor:listerId.srt_color,
          maxColor:listerId.max_color,
          minNumber:listerId.min,
          srtNumber:listerId.srt,
          maxNumber:listerId.max,

        }
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
  async dashGET(req, res) {
    try {
      const lister = await TitleStatic.findAll()
      if(lister.length <= 0){
       return res.render("pages/dasboard",{
          lister:"",
          data:"",
          startDate:undefined,
          endDate:undefined
        })
      }
      res.redirect(`detail/${lister[0].id}`)
    } catch (e) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: e,
      })
    }
  }
  async dashIdGet(req,res){
    try {
      let startDate = undefined
      let endDate = undefined

      const listerId = await TitleStatic.findOne({
        where:{
          id:req.params.id
        }
      })


      if(!req.query.startDate && !req.query.endDate) {
        const get_data = await Static.findOne({
          where: {
            TitleStaticId:listerId.id,
          }
        })
        startDate = get_data.formattedStartDate
        endDate = get_data.formattedEndDate
      }else {
        startDate = req.query.startDate
        endDate = req.query.endDate
      }

      const lister = await TitleStatic.findAll()
      

      const get_static = await Static.findAll({
        where: {
          TitleStaticId:listerId.id,
          formattedStartDate:startDate.trim(),
          formattedEndDate:endDate.trim()
        }
      })



      res.render("pages/dasboard",{
        listerID:listerId.id,
        lister:lister,
        data:get_static,
        startDate:startDate,
        endDate:endDate

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