const multer = require('multer');
// const uploadImage = async (req, res, next) => {
  // try {

      console.log('its here')
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "../images");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);

      },
    });
    console.log("🚀 ~ file: upload.middleware.js:14 ~ upload ~ storage:", storage)

    const fileFilter = (req, file, cb) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif"
      ) {
        console.log('its in type')
        cb(null, true);
      } else {
        cb(new Error("Unsupported file type"), false);
      }
    };

    const upload = multer({
      storage: storage,
      fileFilter: fileFilter,
    });

      

module.exports = upload;
