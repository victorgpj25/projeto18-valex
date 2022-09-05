import Cryptr from "cryptr"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)


import * as cardRepository from "../repositories/cardRepository"

const cryptr = new Cryptr("superSecretKey")

export async function verifyCardStatus(id: number) {
    const cardData = await cardRepository.findById(id)
    if (!cardData) throw {code: "card_not_registered", message: "Given card id is not registered"}
    if (dayjs(cardData.expirationDate, "MM/YY").isBefore(dayjs())) throw {code: "card_expired", message: "Given card id is expired"}
    if (cardData.password) throw {code: "card_already_activated", message: "Given card id is already activated"}
}

export async function verifySecurityCode(id: number, securityCode: string) {
    const cardData = await cardRepository.findById(id)
    if (securityCode !== cryptr.decrypt(cardData.securityCode)) throw {code: "wrong_security_code", message: "Given security code does not match given card data"}
}

export async function encryptPassword(password: string) {
    return bcrypt.hash(password, 10)
}
