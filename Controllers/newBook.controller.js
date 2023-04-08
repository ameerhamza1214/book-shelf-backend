const Book = require('../models/newBook.model');
const multer = require('multer');
const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    SUCCESS_STATUS,
    HTTP_STATUS_CODE,
  } = require("../constants/constants");

const newbook = async (req, res) => {
  try {
    const { title, author,genere  } = req.body;
    console.log('this is image',req.file)
    // const image = req.file;
    const book = new Book({
        title,
        author,
        genere,
        image: req.file
    });

    await book.save();
    return res.status(HTTP_STATUS_CODE.OK).send({
        success: SUCCESS_STATUS.TRUE,
        message: SUCCESS_MESSAGE.BOOK_CREATED,
        data:book
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getbook = async (req, res) => {
    try {
        const bookData =await Book.find()
        return res.status(HTTP_STATUS_CODE.OK).send({
            success: SUCCESS_STATUS.TRUE,
            message: SUCCESS_MESSAGE.BOOK_FETCH,
            data:bookData
          });
      }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const move = async (req, res) => {
    try {
        console.log('==== reading')
        const payload ={
            status : req.body.status
        }
        console.log("🚀 ~ file: newBook.controller.js:50 ~ move ~ payload:", payload)
        console.log('its in move',req.body)
        const data = req.body.status
        const bookData =await Book.updateOne({ _id: req.body._id }, payload)
        return res.status(HTTP_STATUS_CODE.OK).send({
            success: SUCCESS_STATUS.TRUE,
            message: SUCCESS_MESSAGE.BOOK_MOVE,
            data:bookData
          });
      }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const deleteBook = async (req, res) => {
    try {
        console.log('its here delete');
        const payload ={
            _id : req.body._id
        }
        console.log("🚀 ~ file: newBook.controller.js:50 ~ move ~ payload:", payload)
        console.log('its in move',req.body)
        const bookData =await Book.deleteOne(payload)
        return res.status(HTTP_STATUS_CODE.OK).send({
            success: SUCCESS_STATUS.TRUE,
            message: 'Book Deleted',
            data:bookData
          });
      }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { newbook ,getbook ,move ,deleteBook };