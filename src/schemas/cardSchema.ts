import joi from "joi"


const createCardSchema = joi.object({
    employeeId: joi.number().required()
        .messages({
            "any.required": "EmployeeId is required",
            "number.base": "Sent employeeId is not valid"
        }),
    type: joi.string().valid("groceries", "restaurants", "transport", "education", "health").required()
        .messages({
            "any.required": "Card type is required",
            "string.base": "Sent card type is not valid",
            "any.only": "Sent card type is not a registered option"
        })
})

export { createCardSchema }