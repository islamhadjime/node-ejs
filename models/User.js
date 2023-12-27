const { Model,DataTypes } = require('sequelize');

const sequelize = require('../dbconfig');


class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname:{
      type: DataTypes.STRING,
    },
    email:{
      type:DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    }
  },
  { sequelize, modelName: 'User' }
);





module.exports = User;