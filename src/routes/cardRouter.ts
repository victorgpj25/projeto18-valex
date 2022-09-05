import express from "express"

import {
    createCard, 
    activateCard, 
    displayBalance,
    blockCard
} from "../controllers/cardController"
import { verifyApiKey } from "../middlewares/authMiddleware"
import {
    validateCreateCardData, 
    validateActivateCardReqBody, 
    validateDisplayBalanceReqBody,
    validateBlockCardReqBody
} from "../middlewares/cardMiddleware"

const cardRouter = express.Router()

cardRouter.post("/card/create", verifyApiKey, validateCreateCardData, createCard)
cardRouter.post("/card/activate", validateActivateCardReqBody, activateCard)
cardRouter.post("/card/balance", validateDisplayBalanceReqBody, displayBalance)
cardRouter.post("/card/block", validateBlockCardReqBody, blockCard)

export default cardRouter