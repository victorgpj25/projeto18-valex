import { Request, Response, NextFunction } from "express";

import { registerPaymentSchema } from "../schemas/paymentSchema"

export function validateRegisterPaymentReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = registerPaymentSchema.validate(req.body)
    if (validation.error) {
        res.status(422).send({ErrorMessage: "Payment register failed due to " + validation.error})
        return
    }

    next();
}