import express from "express"

import { registerPayment } from "../controllers/paymentController"
import { validateRegisterPaymentReqBody } from "../middlewares/paymentMiddleware"

const paymentRouter = express.Router()

paymentRouter.post("/payment", validateRegisterPaymentReqBody, registerPayment)

export default paymentRouter