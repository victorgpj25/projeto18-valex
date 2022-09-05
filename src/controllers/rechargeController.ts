import { Request, Response } from "express";

import * as rechargeService from "../services/rechargeService"
import * as companyService from "../services/companyService"

export async function rechargeCard(req: Request, res: Response) {
    const { id, amount }: {id: number, amount: number } = req.body
    if (!req.headers["x-api-key"]) return null // error caught in authMiddleware/verifyApiKey()
    const apiKey = req.headers["x-api-key"].toString()

    await companyService.validateApiKey(apiKey)
    await rechargeService.rechargeCard(Number(id), Number(amount))

    res.sendStatus(200)
}