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

export async function activateCard(req: Request, res: Response) {
    const { id, securityCode, password }: {id: number, securityCode: string, password: string} = req.body

    await cardService.activateCard(Number(id), securityCode, password)

    res.sendStatus(200)
}

export async function displayBalance(req: Request, res: Response) {
    const { id}: {id: number} = req.body

    const balanceData = await cardService.displayBalance(Number(id))

    res.status(200).send(balanceData)
}

