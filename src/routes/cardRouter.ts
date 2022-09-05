import express from "express"

import {
    createCard, 
    activateCard, 
    displayBalance,
    blockCard,
    unblockCard
} from "../controllers/cardController"
import { verifyApiKey } from "../middlewares/authMiddleware"
import {
    validateCreateCardData, 
    validateActivateCardReqBody, 
    validateDisplayBalanceReqBody,
    validateBlockCardReqBody,
    validateUnblockCardReqBody
} from "../middlewares/cardMiddleware"

const cardRouter = express.Router()

cardRouter.post("/card/create", verifyApiKey, validateCreateCardData, createCard)
cardRouter.post("/card/activate", validateActivateCardReqBody, activateCard)
cardRouter.post("/card/balance", validateDisplayBalanceReqBody, displayBalance)
cardRouter.post("/card/block", validateBlockCardReqBody, blockCard)
cardRouter.post("/card/unblock", validateUnblockCardReqBody, unblockCard)


export default cardRouter