import { Request, Response } from "express";

import cardService from "../services/cardService"

export async function createCard(req: Request, res: Response) {
    const { employeeId, type } = req.body

    await cardService.createCard(Number(employeeId), type)

    res.sendStatus(201)
}