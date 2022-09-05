import { Request, Response } from "express";

import * as paymentService from "../services/paymentService"

export async function registerPayment(req: Request, res: Response) {
    const { cardId, password, businessId, amount }: {cardId: number, password: string, businessId: number, amount: number} = req.body

    await paymentService.registerPayment(Number(cardId), password, Number(businessId), Number(amount))

    res.sendStatus(200)
}