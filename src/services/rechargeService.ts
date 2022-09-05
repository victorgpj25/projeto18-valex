import * as rechargeRepository from "../repositories/rechargeRepository"
import * as rechargeCardUtils from "../utils/rechargeCardUtils"

export async function rechargeCard(id: number, amount: number) {
    await rechargeCardUtils.verifyCardStatus(id)
    await rechargeRepository.insert({cardId: id, amount})
}