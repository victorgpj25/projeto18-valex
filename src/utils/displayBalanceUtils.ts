import dayjs from "dayjs"


import * as cardRepository from "../repositories/cardRepository"
import * as paymentRepository from "../repositories/paymentRepository"
import * as rechargeRepository from "../repositories/rechargeRepository"

export async function verifyCardStatus(id: number) {
    const cardData = await cardRepository.findById(id)
    if (!cardData) throw {code: "card_not_registered", message: "Given card id is not registered"}
}

export async function getBalanceData(id: number) {
    const transactions = await paymentRepository.findByCardId(id)
    const recharges = await rechargeRepository.findByCardId(id)

    const balanceData:{
        balance: number,
        transactions: paymentRepository.PaymentWithBusinessName[],
        recharges: rechargeRepository.Recharge[]
    } 
    = {
        balance: calcBalance(transactions, recharges),
        transactions: formatTransactionDates(transactions),
        recharges: formatRechargeDates(recharges)
    }

    return balanceData
}

function calcBalance (transactions: paymentRepository.PaymentWithBusinessName[], recharges: rechargeRepository.Recharge[]) {
    let transactionsTotal: number = 0
    let rechargesTotal: number = 0

    transactions.forEach(transaction => transactionsTotal += transaction.amount)
    recharges.forEach(recharge => rechargesTotal += recharge.amount)

    const balance: number = rechargesTotal - transactionsTotal

    return balance
}

function formatTransactionDates(transactions: paymentRepository.PaymentWithBusinessName[]) {
    transactions.forEach(transaction => transaction.timestamp = dayjs(transaction.timestamp).format("DD/MM/YYYY"))
    return transactions
}

function formatRechargeDates(recharges: rechargeRepository.Recharge[]) {
    recharges.forEach(recharge => recharge.timestamp = dayjs(recharge.timestamp).format("DD/MM/YYYY"))
    return recharges
}


