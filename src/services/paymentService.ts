import * as paymentRepository from "../repositories/paymentRepository"
import * as registerPaymentUtils from "../utils/registerPaymentUtils"
import * as blockCardUtils from "../utils/blockCardUtils"

export async function registerPayment(cardId: number, password: string, businessId: number, amount: number) {
    await registerPaymentUtils.verifyCardStatus(cardId)
    await blockCardUtils.verifyPassword(cardId, password)
    await registerPaymentUtils.verifyBusinessId(businessId)
    await registerPaymentUtils.verifyBusinessAndCardType(cardId, businessId)
    await registerPaymentUtils.verifyAvailableBalance(cardId, amount)

    await paymentRepository.insert({cardId, businessId, amount})
}