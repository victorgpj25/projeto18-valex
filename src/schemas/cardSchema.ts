import joi from "joi"


const createCardSchema = joi.object({
    employeeId: joi.number().required()
        .messages({
            "any.required": "Employee id is required",
            "number.base": "Sent employee id is not valid"
        }),
    type: joi.string().valid("groceries", "restaurants", "transport", "education", "health").required()
        .messages({
            "any.required": "Card type is required",
            "string.base": "Sent card type is not valid",
            "any.only": "Sent card type is not a registered option"
        })
})

const activateCardSchema = joi.object({
    id: joi.number().required()
        .messages({
            "any.required": "card id is required",
            "number.base": "Sent card id is not valid"
        }),

    securityCode: joi.string().pattern(/^[0-9]{3}$/).required()
        .messages({
            "any.required": "Card type is required",
            "string.base": "Sent security code is not valid",
            "string.pattern.base": "Security codes must be 3 numerical digits long"
        }),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
        .messages({
            "any.required": "Password is required",
            "string.base": "Sent password is not valid",
            "string.pattern.base": "Passwords must be 4 numerical digits long"
        })
})

export { createCardSchema, activateCardSchema }