require("dotenv").config()
const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const sequelize = require("./dbconfig")
const routes = require("./routes/post.routes")


const { registerValidator } = require("./validators/registerValidator")
const { loginValidator } = require("./validators/loginValidator")


const midlleRole = require("./middleware/middleRole")
const middleUser = require("./middleware/middleUser")


const { HomeController } = require("./controllers/middle.register")


const app = express()

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())





// Test file


// const Static = require("./models/Static")
// const path = require('path')
// const file = path.basename("example.xlsx")







// app.get("/file",async (req,res)=>{
//   try{
    
//     const jsonData = readEXL(file)
//     res.status(200).json({
//       message:jsonData
//     })
//   }catch(err){
//     res.status(505).json({
//       message:"error"
//     })
//   }
  
// })







//  USER WORK ************************ /
// app.get("/", middleUser, async (req, res, next) => {
//   try {
//     res.status(200).json({
//       data: "USERS",
//     })

//   } catch (e) {

//   }
// })

// app.get("/admin", middleUser, midlleRole, (req, res, next) => {
//   res.status(200).json({
//     message: "Доступ админ"
//   })
// })






app.use("/post/v1/",routes)


//  REGISTER USER *************************** /
app.post("/auth/v1/register", registerValidator, HomeController.register)
app.post("/auth/v1/login", loginValidator, HomeController.login)
app.get("/auth/v1/logout", HomeController.logout)


async function main() {
  try {
    await sequelize.sync({ force: false })
    app.listen(3000, () => {
      console.log("Server start and port 3000");
    })
  } catch (e) {
    console.log(e);
  }

}
main()

