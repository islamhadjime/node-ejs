

const Static = require('../models/Static');
const { Op } = require("sequelize")


class DashController {

    async dashGET(req,res){
        try{
            const get_static = await Static.findAll()
            if(!get_static){
                return res.status(400).json({
                    message:"No date"
                })
            }
            res.status(200).json({
                message:get_static
            })
    
        }catch(e){
            res.status(500).json({
                status: "error",
                code: 500,
                data: [],
                message: e,
            })
        }
    }

    async area(req,res){
        try{
            const area_get = await Static.findOne({
                where:{
                    id:req.params.id
                }
            })
            
            res.status(200).json({
                message:area_get
            })
    
        }catch(e){
            res.status(500).json({
                status: "error",
                code: 500,
                data: [],
                message: e,
            })
        }
    }


    async datePOST(req,res){
        try{
            res.status(200).json({
                message:"datePOST"
            })
        }catch(e){
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