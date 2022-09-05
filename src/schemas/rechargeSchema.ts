import joi from "joi"

const rechargeCardSchema = joi.object({
    id: joi.number().required()
        .messages({
            "any.required": "card id is required",
            "number.base": "Sent card id is not valid"
        }),
    amount: joi.number().integer().positive().required()
        .messages({
            "any.required": "Password is required",
            "number.base": "Sent recharge amount is not valid",
            "number.integer": "Recharge amount must be an integer",
            "number.positive": "Recharge amount must be a positive number"
        })
})

export { rechargeCardSchema }