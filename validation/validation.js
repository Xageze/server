const joi = require('joi');

function userValidation(body) {
    const userValidationSignUp = joi.object({
        selectedSubscription: joi.object({
            name: joi.string().required(),
            price: joi.number().required(),
        }),
        civility: joi.string().required(),
        firstName: joi.string().min(3).max(30).trim().required(),
        lastName: joi.string().min(3).max(30).trim().required(),
        phone: joi.string().min(8).max(12).trim().required(),
        birthDate: joi.date().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).max(30).required(),
        address: joi.string().trim().required(),
        postalCode: joi.string().trim().required(),
        city: joi.string().trim().required(),
        country: joi.string().trim().required(),
    })

    const userValidationLogin = joi.object({
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).max(30).required(),
    })

    return {
        userValidationSignup: userValidationSignUp.validate(body),
        userValidationLogin: userValidationLogin.validate(body)
    }
}

module.exports = userValidation;