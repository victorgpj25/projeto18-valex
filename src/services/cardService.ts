import * as employeeRepository from "../repositories/employeeRepository"
import * as cardRepository from "../repositories/cardRepository"
import * as createCardUtils from "../utils/createCardUtils"

export async function createCard(employeeId: number, type: cardRepository.TransactionTypes) {
    await createCardUtils.validateEmployee(employeeId)
    await createCardUtils.verifyCardConflict(employeeId, type)

    const cardData: cardRepository.CardInsertData = {
        employeeId,
        number: createCardUtils.generateCardNumber(),
        cardholderName: await createCardUtils.formatCardholderName(employeeId),
        securityCode: createCardUtils.generateCardSecurityCode(),
        expirationDate: createCardUtils.generateCardExpirationDate(),
        password: null,
        isVirtual: false,
        isBlocked: false,
        type
    }

    await cardRepository.insert(cardData)
}


