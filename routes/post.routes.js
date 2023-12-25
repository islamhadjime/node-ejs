



const express = require("express")
const routes = express.Router()


const readEXL = require("../helpers/XLS.read")
const Static = require("../models/Static")










routes.get("/", async (req,res)=>[
    res.status(200).json({
        message:"/"
    })
])






// TEST FILE GET XLS
const path = require("path")
const file = path.basename("./example.xlsx")

routes.post("/file",async (req,res)=>{
    try{

        const data_get = readEXL(file)
        if(!data_get) {
            res.status(404).json({
                status: "file",
                code: 404,
                data: [],
                message: "File error",
            })
        }


        await Static.bulkCreate(data_get.map( item => ({
            numb:item[0],
            name:item[1],
            department:item[2]
        })))
        res.status(200).json({
            message:data_get
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