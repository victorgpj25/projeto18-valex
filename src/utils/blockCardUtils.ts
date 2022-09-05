import bcrypt from "bcrypt"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import * as cardRepository from "../repositories/cardRepository"

export async function verifyCardStatus(id: number) {
    const cardData = await cardRepository.findById(id)
    if (!cardData) throw {code: "card_not_registered", message: "Given card id is not registered"}
    if (dayjs(cardData.expirationDate, "MM/YY").isBefore(dayjs())) throw {code: "card_expired", message: "Given card id is expired"}
    if (cardData.isBlocked) throw {code: "card_already_blocked", message: "Given card id is already blocked"}
}

export async function verifyPassword(id: number, password: string) {
    const cardData = await cardRepository.findById(id)
    if (!cardData.password) return null // error caught in blockCardUtils/verifyCardStatus
    if (!(await bcrypt.compare(password, cardData.password))) throw {code: "wrong_password", message: "Given password does not match given card data"}
}