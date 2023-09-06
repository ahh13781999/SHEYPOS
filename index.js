require("express-async-errors")
require("dotenv").config()

const express = require("express")
const app = express()
const connectDB = require("./config/db")
// ROUTERS
const ItemRouter = require("./routes/ItemRoutes")
const UserRouter = require("./routes/UserRoutes")
const BillRouter = require("./routes/BillRoutes")

// MIDDLEWARE
app.use(express.json())
// ROUTES
app.use("/api/items", ItemRouter)
app.use("/api/users", UserRouter)
app.use("/api/bills", BillRouter)
// PORT
const port = process.env.PORT || 3000
// START
const Start = async () => {
  try {
    app.listen(port, () =>
      console.log(`The Server is listening on port ${port}`)
    )
    await connectDB(process.env.MONGO_URI)
  } catch (error) {
    console.log(error)
  }
}

Start()
