import express from "express"

import { createCard, activateCard } from "../controllers/cardController"
import { verifyApiKey } from "../middlewares/authMiddleware"
import { validateCreateCardData, validateActivateCardReqBody } from "../middlewares/cardMiddleware"

const cardRouter = express.Router()

cardRouter.post("/card/create", verifyApiKey, validateCreateCardData, createCard)
cardRouter.post("/card/activate", validateActivateCardReqBody, activateCard)

export default cardRouter