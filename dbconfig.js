const  { Sequelize } = require("sequelize");


const sequelize = new Sequelize('db',"user","pass",{
    dialect:"sqlite",
    host:"./dev.sqlite",
    define:{
        timestamps:false
    }
})



module.exports = sequelize;