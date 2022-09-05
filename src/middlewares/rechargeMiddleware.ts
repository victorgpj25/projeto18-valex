import { Request, Response, NextFunction } from "express";

import { rechargeCardSchema } from "../schemas/rechargeSchema"

export function validateRechargeCardReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = rechargeCardSchema.validate(req.body)
    if (validation.error) {
        res.status(422).send({ErrorMessage: "Card recharge failed due to " + validation.error})
        return
    }

    next();
}