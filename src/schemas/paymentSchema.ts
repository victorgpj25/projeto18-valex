import joi from "joi"

const registerPaymentSchema = joi.object({
    cardId: joi.number().required()
        .messages({
            "any.required": "card id is required",
            "number.base": "Sent card id is not valid"
        }),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
        .messages({
            "any.required": "Password is required",
            "string.base": "Sent password is not valid",
            "string.pattern.base": "Passwords must be 4 numerical digits long"
        }),
    businessId: joi.number().required()
        .messages({
            "any.required": "Business id is required",
            "number.base": "Sent business id is not valid"
        }),
    amount: joi.number().integer().positive().required()
        .messages({
            "any.required": "Amount is required",
            "number.base": "Sent payment amount is not valid",
            "number.integer": "Payment amount must be an integer",
            "number.positive": "Payment amount must be a positive number"
        })
})

export { registerPaymentSchema }







