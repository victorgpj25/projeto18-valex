import { Request, Response, NextFunction } from "express";

import { createCardSchema, activateCardSchema, displayBalanceSchema } from "../schemas/cardSchema"

export function validateCreateCardData(req: Request, res: Response, next: NextFunction) {
    const validation = createCardSchema.validate(req.body)
    if (validation.error) {
        res.status(422).send({ErrorMessage: "Card creation failed due to " + validation.error})
        return
    }

    next();
}

export function validateActivateCardReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = activateCardSchema.validate(req.body)
    if (validation.error) {
        res.status(422).send({ErrorMessage: "Card activation failed due to " + validation.error})
        return
    }

    next();
}

export function validateDisplayBalanceReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = displayBalanceSchema.validate(req.body)
    if (validation.error) {
        res.status(422).send({ErrorMessage: "Balance display failed due to " + validation.error})
        return
    }

    next();
}