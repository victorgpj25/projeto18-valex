import bcrypt from "bcrypt"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import * as cardRepository from "../repositories/cardRepository"

export async function verifyCardStatus(id: number) {
    const cardData = await cardRepository.findById(id)
    if (!cardData) throw {code: "card_not_registered", message: "Given card id is not registered"}
    if (dayjs(cardData.expirationDate, "MM/YY").isBefore(dayjs())) throw {code: "card_expired", message: "Given card id is expired"}
    if (!cardData.isBlocked) throw {code: "card_not_blocked", message: "Given card id is not blocked"}
}