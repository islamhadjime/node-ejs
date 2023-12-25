const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../dbconfig")
const User = require("./User")


class Static extends Model { }

Static.init({

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numb:{
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  department: {
    type: DataTypes.STRING
  }
  },{
    sequelize,
    defaultValue:"Static"
})


User.hasMany(Static,{
  onDelete:"cascade",
  name:"static_id",
  allowNull: true
})



module.exports = Static;
