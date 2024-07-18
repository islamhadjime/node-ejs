

const Static = require("../models/Static")


const checkData = (formattedStartDate,formattedEndDate,id) => {
  return new Promise((resolve,reject)=>{
    Static.findAll({
      where:{
        TitleStaticId:id,
        formattedStartDate:formattedStartDate,
        formattedEndDate:formattedEndDate
      }
    })
    .then((data)=>{
      resolve(data)
    })
  })
}

module.exports = checkData