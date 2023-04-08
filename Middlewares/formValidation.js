const Joi = require('@hapi/joi')
const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    SUCCESS_STATUS,
    HTTP_STATUS_CODE,
} = require('../constants/constants')

const validateSignUp = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(24).required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        country: Joi.string().min(3).max(24).required(),
    })
    const options = {
        errors: {
            wrap: {
                label: '',
            },
        },
    }
    const Payload = {
       name : req.body.name,
       email : req.body.email,
       password : req.body.password,
       country : req.body.country,

    }
    const {error}= schema.validate(Payload, options)
    if(error){
        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send({
            success: SUCCESS_STATUS.FALSE,
            message: error?.details[0]?.message,
        })
    }
    next();
}
const validateSignIn = (req,res,next) => {
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    const options = {
        errors: {
            wrap: {
                label: '',
            },
        },
    }
    const Payload = {
       email : req.body.email,
       password : req.body.password,

    }
    const {error}= schema.validate(Payload, options)
    if(error){
        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send({
            success: SUCCESS_STATUS.FALSE,
            message: error?.details[0]?.message,
        })
    }
    next();
}

module.exports = {
    validateSignUp,
    validateSignIn,
}