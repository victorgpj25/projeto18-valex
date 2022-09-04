import { Request, Response, NextFunction } from "express";

export async function verifyApiKey(req: Request, res: Response, next: NextFunction) {
    if (!req.headers["x-api-key"]) {
        res.status(401).send({ErrorMessage: "Card creation failed: api key was not sent"})
        return
    }

    next();
}