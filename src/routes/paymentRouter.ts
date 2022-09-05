import express from "express"

import { registerPayment } from "../controllers/rechargeController"
import { validateRegisterPaymentReqBody } from "../middlewares/rechargeMiddleware"

const paymentRouter = express.Router()

paymentRouter.post("/payment/register", validateRegisterPaymentReqBody, registerPayment)

export default paymentRouter