const express = require('express')
const controller = require('../Controllers/user.controllers')
const router = express.Router()
const middleware = require('../Middlewares/formValidation')

router.route('/signup').post(middleware.validateSignUp,controller.signup)
router.route('/userdata').get(controller.userdata)
router.route('/signin').post(middleware.validateSignIn,controller.signin)

module.exports = router
