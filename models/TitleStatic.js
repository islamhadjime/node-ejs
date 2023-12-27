

const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../dbconfig")

class TitleStatic  extends Model {}


TitleStatic.init({

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title:{
        type:DataTypes.STRING,
    },
    desc:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    timestamps:true
})


module.exports = TitleStatic;


