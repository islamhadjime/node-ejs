

const readEXL = require("../helpers/XLS.read")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { Op } = require('sequelize')
const fs = require("fs")


const Static      = require('../models/Static');
const TitleStatic = require("../models/TitleStatic")


class ControlAdmin {

    async home_get(req,res){
        try{
            res.status(200).json({
                message:"admin"
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

    async file_post(req,res){
        try{
            const data = readEXL(req.file.path)
            if(!data) {
                return res.status(400).json({
                    message:"Error file"
                })
            }
            const a  = await Static.bulkCreate(data.map( item => ({
                date:new Date().toLocaleDateString('ru-Ru'),
                ...item
            })))
            // После записи удаляю файл
            fs.unlink(req.file.path,(err)=>{
                if(err){
                    console.log(err);
                }
            })
            res.status(200).json({
                message:a
            })
        }catch(e){
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
