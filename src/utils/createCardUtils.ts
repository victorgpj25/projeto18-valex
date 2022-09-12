import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import Cryptr from "cryptr"

import * as employeeRepository from "../repositories/employeeRepository"
import * as cardRepository from "../repositories/cardRepository"

const cryptr = new Cryptr("superSecretKey")

export async function validateEmployee(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId)
    if (!employee) throw {code: "employee_not_registered", message: "Given employeeId is not registered"}
}

export async function verifyCardConflict(employeeId: number, type: cardRepository.TransactionTypes) {
    const cardConflict = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
    if (cardConflict) throw {code: "card_conflict", message: "Employee already have a card of the selected type"}
}

export function generateCardNumber() {
    return faker.random.numeric(16)
}

export async function formatCardholderName(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId)
    const names: string[] = employee.fullName.split(" ")
    let cardholderName: string = ""
    names.map((name, i) => {
        if (i === 0) {
            cardholderName += name + " "
        }
        if (i === names.length - 1) {
            cardholderName += name
        }
        if ((i !== 0 && i !== names.length - 1) && name.length > 2) {
            cardholderName += name[0] + " "
        } 
        
    })

    return cardholderName.toUpperCase()
}

export function generateCardExpirationDate() {
    return dayjs().add(5, "year").format("MM/YY")
}

export function generateCardSecurityCode() {
    const securityCode = faker.random.numeric(3)
    const securityCodes = {
        decrypted: securityCode,
        encrypted: cryptr.encrypt(securityCode)
    }
    return securityCodes
}



