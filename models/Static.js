const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../dbconfig")
const TitleStatic = require("./TitleStatic")
const moment = require('moment');

class Static extends Model { }

Static.init({

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING
  },
  lessons: {
    type: DataTypes.STRING
  },
  issuance: {
    type: DataTypes.STRING
  },
  those:{
    type: DataTypes.STRING
  },
  maintaining: {
    type: DataTypes.STRING
  },
  marks: {
    type: DataTypes.STRING
  },
  logging:{
    type:DataTypes.STRING
  },
  timely:{
    type:DataTypes.STRING
  },
  date:{
    type:DataTypes.STRING,
    allowNull:false,
  }
  },{
    sequelize,
    defaultValue:"Static"
})


TitleStatic.hasOne(Static,{
  onDelete:"cascade",
})


module.exports = Static;
