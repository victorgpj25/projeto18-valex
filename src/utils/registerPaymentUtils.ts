import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import * as cardRepository from "../repositories/cardRepository"
import * as businessRepository from "../repositories/businessRepository"
import * as paymentRepository from "../repositories/paymentRepository"
import * as rechargeRepository from "../repositories/rechargeRepository"

export async function verifyCardStatus(id: number) {
    const cardData = await cardRepository.findById(id)
    if (!cardData) throw {code: "card_not_registered", message: "Given card id is not registered"}
    if (!cardData.password) throw {code: "card_not_activated", message: "Given card id is not activated"}
    if (dayjs(cardData.expirationDate, "MM/YY").isBefore(dayjs())) throw {code: "card_expired", message: "Given card id is expired"}
    if (cardData.isBlocked) throw {code: "card_blocked", message: "Given card id is blocked"}
}

export async function verifyBusinessId(id: number) {
    const businessData = await businessRepository.findById(id)
    if (!businessData) throw {code: "business_not_registered", message: "Given business id is not registered"}
}

export async function verifyBusinessAndCardType(cardId: number, businessId: number) {
    const cardData = await cardRepository.findById(cardId)
    const businessData = await businessRepository.findById(businessId)
    if (cardData.type !== businessData.type) throw {code: "payment_type_conflict", message: "Card and business type do not match"}
}

export async function verifyAvailableBalance(cardId: number, amount: number) {
    const transactions = await paymentRepository.findByCardId(cardId)
    const recharges = await rechargeRepository.findByCardId(cardId)

    let transactionsTotal: number = 0
    let rechargesTotal: number = 0

    transactions.forEach(transaction => transactionsTotal += transaction.amount)
    recharges.forEach(recharge => rechargesTotal += recharge.amount)

    const balance: number = rechargesTotal - transactionsTotal

    if (amount > balance) throw {code: "insufficient_funds", message: "Current purchase price is higher than the current balance"}
}