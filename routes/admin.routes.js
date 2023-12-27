



const express = require("express")
const routes = express.Router()
const readEXL = require("../helpers/XLS.read")
const Static = require("../models/Static")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { Op } = require('sequelize')
const fs = require("fs")







routes.get("/", async (req,res)=>{
    try{
        const static = await Static.findAll({
            where:{
                date:{
                    [Op.between]:['27.12.2023','27.12.2023']
                }
            }
        })
        res.status(200).json({
            message:static
        })
    }catch(e){
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: e,
        })
    }
})






routes.post("/file",upload.single('file') ,async (req,res)=>{
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
})



module.exports = routes