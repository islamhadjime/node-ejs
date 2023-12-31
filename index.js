require("dotenv").config()
const express      = require("express")
const cors         = require('cors')
const cookieParser = require("cookie-parser")
const sequelize    = require("./dbconfig")


const midlleRole   = require("./middleware/middleRole")
const middleUser   = require("./middleware/middleUser")
const routes_admin = require("./routes/admin.routes")
const routes_dash  = require("./routes/dash.routes")
const routes_auth  = require("./routes/auth.routes")


const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())



// app.use("/admin/v1/",middleUser, midlleRole,routes)
app.use("/dashboard/v1/",routes_dash)
app.use("/admin/v1/",routes_admin)
app.use("/auth/v1/",routes_auth)

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

