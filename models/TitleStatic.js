

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
    min_color:{
      type:DataTypes.STRING
    },
    srt_color:{
      type:DataTypes.STRING
    },
    max_color:{
      type:DataTypes.STRING
    },
    min:{
      type:DataTypes.STRING
    },
    srt:{
      type:DataTypes.STRING
    },
    max:{
      type:DataTypes.STRING
    },
    date:{
      type:DataTypes.STRING,
      allowNull:false,
    }
},{
    sequelize,
})


module.exports = TitleStatic;


