import express from "express"

import { createCard } from "../controllers/cardController"
import { validateCardType } from "../middlewares/cardMiddleware"

const cardRouter = express.Router()

cardRouter.post("/card/create", validateCardType, createCard)

export default cardRouter