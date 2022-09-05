import express from "express"

import { rechargeCard } from "../controllers/rechargeController"
import { verifyApiKey } from "../middlewares/authMiddleware"
import { validateRechargeCardReqBody } from "../middlewares/rechargeMiddleware"

const rechargeRouter = express.Router()

rechargeRouter.post("/recharge", verifyApiKey, validateRechargeCardReqBody, rechargeCard)

export default rechargeRouter