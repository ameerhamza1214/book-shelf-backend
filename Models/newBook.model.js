const mongoose = require('mongoose')

const NewbookSchema = new mongoose.Schema(
    {
        title: { type: String ,
             required: true, },
        author: { type: String ,
            required: true, },
        status: { type: String ,
             default:'plan' },
        image: {
            type: String,
            required: true,
          }

    },
    { timestamps: true }
)

module.exports = mongoose.model('Newbook', NewbookSchema)