const mongoose = require('mongoose')

const SignupSchema = new mongoose.Schema(
    {
        name: { type: String ,required: true,},
        email: { type: String  ,required: true,},
        password:{ type: String,required: true, },
        country: { type: String ,required: true,},

    },
    { timestamps: true }
)

module.exports = mongoose.model('Signup', SignupSchema)