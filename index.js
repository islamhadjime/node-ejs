require("dotenv").config()
const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const expressLayouts = require('express-ejs-layouts')

const sequelize = require("./dbconfig")

const midlleRole = require("./middleware/middleRole")
const middleUser = require("./middleware/middleUser")
const routes_admin = require("./routes/admin.routes")
const routes_dash = require("./routes/dash.routes")
const routes_auth = require("./routes/auth.routes")


const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))


// USE GET midlleRole/middleUser
app.use("/",routes_dash)
app.use("/admin/", routes_admin)
app.use("/auth/", routes_auth)




async function main() {
  try {
    await sequelize.sync({ force: true })
    app.listen(4000, () => {
      console.log("Server start and port 3000");
    })
  } catch (e) {
    console.log(e);
  }

}
main()

