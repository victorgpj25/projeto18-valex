import { Request, Response } from "express";

import * as cardService from "../services/cardService"
import * as companyService from "../services/companyService"
import * as cardRepository from "../repositories/cardRepository"

export async function createCard(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: cardRepository.TransactionTypes } = req.body
    if (!req.headers["x-api-key"]) return null // error caught in authMiddleware/verifyApiKey()
    const apiKey = req.headers["x-api-key"].toString()

    await companyService.validateApiKey(apiKey)
    await cardService.createCard(Number(employeeId), type)

    res.sendStatus(201)
}