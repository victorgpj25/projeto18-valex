import express from "express"

import cardRouter from "./cardRouter"
import rechargeRouter from "./rechargeRouter"

const router = express.Router()

router.use(cardRouter)
router.use(rechargeRouter)

export default router