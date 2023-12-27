require("dotenv").config()
const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const sequelize = require("./dbconfig")
const routes_admin = require("./routes/admin.routes")


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



// app.use("/admin/v1/",middleUser, midlleRole,routes)
app.use("/admin/v1/",routes_admin)


//  REGISTER USER *************************** /
app.post("/auth/v1/register", registerValidator, HomeController.register)
app.post("/auth/v1/login", loginValidator, HomeController.login)
app.get("/auth/v1/logout", HomeController.logout)


async function main() {
  try {
    await sequelize.sync({ force: true })
    app.listen(3000, () => {
      console.log("Server start and port 3000");
    })
  } catch (e) {
    console.log(e);
  }

}
main()

