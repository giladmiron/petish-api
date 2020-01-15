var { body, param, validationResult } = require('express-validator')

const getDocsValidator = () => {
    return [
        body('token').exists().withMessage('you must send token field with the request'),
        body('type').exists().withMessage('you must send type field with the request').bail().custom(value => value == 1 || value == 2).withMessage('type must be with value of 0 or 1'),
        body('page').exists().withMessage('you must send page field with the request').bail().isInt().withMessage('field must be an integer').custom(value => value > -1 && value < 10).withMessage('page cant be greater than 9'),
        body('limit').exists().withMessage('you must send limit field with the request').bail().isInt().withMessage('field must be an integer').custom(value => value > 0 && value < 10).withMessage('limit cant be greater than 10'),
    ]
}

const tokenExistenceValidator = () => {
    return [
        body('token').exists().withMessage('you must send token field with the request'),
    ]
}


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    validate,
    getDocsValidator,
    tokenExistenceValidator
}