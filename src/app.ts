import express from "express"
import "express-async-errors"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

import router from "./routes/index"
import errorHandler from "./middlewares/errorHandler"


const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT)
})