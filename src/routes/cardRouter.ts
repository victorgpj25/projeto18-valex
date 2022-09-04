import express from "express"

import { createCard } from "../controllers/cardController"
import { verifyApiKey } from "../middlewares/authMiddleware"
import { validateCreateCardData } from "../middlewares/cardMiddleware"

const cardRouter = express.Router()

cardRouter.post("/card/create", verifyApiKey, validateCreateCardData, createCard)

export default cardRouter