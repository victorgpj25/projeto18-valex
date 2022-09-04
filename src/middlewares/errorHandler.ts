import { Request, Response, NextFunction } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.code === "error_name") {
        return res.status(400).send({ErrorMessage: error.message})
    }

    res.sendStatus(500)
}