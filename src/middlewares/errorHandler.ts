import { Request, Response, NextFunction } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.code === "invalid_api_key") {
        return res.status(401).send({ErrorMessage: error.message})
    }
    if (error.code === "employee_not_registered") {
        return res.status(404).send({ErrorMessage: error.message})
    }
    if (error.code === "card_conflict") {
        return res.status(409).send({ErrorMessage: error.message})
    }
    if (error.code === "card_not_registered") {
        return res.status(404).send({ErrorMessage: error.message})
    }
    if (error.code === "card_expired") {
        return res.status(403).send({ErrorMessage: error.message})
    }
    if (error.code === "card_already_activated") {
        return res.status(409).send({ErrorMessage: error.message})
    }
    if (error.code === "card_already_blocked") {
        return res.status(409).send({ErrorMessage: error.message})
    }
    if (error.code === "wrong_security_code") {
        return res.status(401).send({ErrorMessage: error.message})
    }
    if (error.code === "wrong_password") {
        return res.status(401).send({ErrorMessage: error.message})
    }

    res.sendStatus(500)
}
