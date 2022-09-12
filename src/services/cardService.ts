import * as cardRepository from "../repositories/cardRepository"
import * as createCardUtils from "../utils/createCardUtils"
import * as activateCardUtils from "../utils/activateCardUtils"
import * as displayBalanceUtils from "../utils/displayBalanceUtils"
import * as blockCardUtils from "../utils/blockCardUtils"
import * as unblockCardUtils from "../utils/unblockCardUtils"

export async function createCard(employeeId: number, type: cardRepository.TransactionTypes) {
    await createCardUtils.validateEmployee(employeeId)
    await createCardUtils.verifyCardConflict(employeeId, type)
    const securityCode: {decrypted: string, encrypted: string} = createCardUtils.generateCardSecurityCode()
    
    const cardInsertData: cardRepository.CardInsertData = {
        employeeId,
        number: createCardUtils.generateCardNumber(),
        cardholderName: await createCardUtils.formatCardholderName(employeeId),
        securityCode: securityCode.encrypted,
        expirationDate: createCardUtils.generateCardExpirationDate(),
        isVirtual: false,
        isBlocked: false,
        type
    }

    const cardReturnData: {securityCode: string} = {
        securityCode: securityCode.decrypted
    }

    await cardRepository.insert(cardInsertData)

    return cardReturnData
}

export async function activateCard(id: number, securityCode: string, password: string) {
    await activateCardUtils.verifyCardStatus(id)
    await activateCardUtils.verifySecurityCode(id, securityCode)

    const cardUpdateData: cardRepository.CardUpdateData = {
        password: await activateCardUtils.encryptPassword(password)
    }

    await cardRepository.update(id, cardUpdateData)
}

export async function displayBalance(id: number) {
    await displayBalanceUtils.verifyCardStatus(id)

    const balanceData = await displayBalanceUtils.getBalanceData(id)

    return balanceData
}

export async function blockCard(id: number, password: string) {
    await blockCardUtils.verifyCardStatus(id)
    await blockCardUtils.verifyPassword(id, password)

    const cardUpdateData: cardRepository.CardUpdateData = {
        isBlocked: true
    }

    await cardRepository.update(id, cardUpdateData)
}

export async function unblockCard(id: number, password: string) {
    await unblockCardUtils.verifyCardStatus(id)
    await blockCardUtils.verifyPassword(id, password)

    const cardUpdateData: cardRepository.CardUpdateData = {
        isBlocked: false
    }

    await cardRepository.update(id, cardUpdateData)
}

