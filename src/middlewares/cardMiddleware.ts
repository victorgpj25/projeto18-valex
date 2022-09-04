import { Request, Response, NextFunction } from "express";

import { createCardSchema } from "../schemas/cardSchema"

export async function validateCreateCardData(req: Request, res: Response, next: NextFunction) {
    const validation = createCardSchema.validate(req.body)
    if (validation.error) {
        res.status(422).send({ErrorMessage: "Card creation failed due to " + validation.error})
        return
    }

    next();
}