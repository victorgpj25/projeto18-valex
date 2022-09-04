import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

import router from "./routes/index"


const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT)
})