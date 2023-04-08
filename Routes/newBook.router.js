const express = require('express')
const controller = require('../Controllers/newBook.controller')
const router = express.Router();
const multer = require('multer');
const Book = require('../models/newBook.model');
const path = require('path')
router.route('/getbook').get(controller.getbook)
router.route('/move').put(controller.move)
router.route('/delete').delete(controller.deleteBook)

var filestorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // specify the filename format
    }
})

var upload = multer({
    storage: filestorageEngine
})
router.post('/newbook' , upload.single('image'), async (req, res) => {
    const file = req.file;
    const { title, author,  } = req.body;
    const image = process.env.BASE_PATH+`uploads/`+file.filename
    const book = new Book({
        title,
        author,
        image,
    });
    console.log('image',image)
    console.log("🚀 ~ file: newBook.router.js:38 ~ router.post ~ book:", book)

    await book.save();
    
    res.status(200).json({
        success: true,
    });
});

module.exports = router
