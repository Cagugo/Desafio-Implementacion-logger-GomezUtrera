const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/productos');
  },
  filename: (req, file, cb) => {
    const uniquePrefix = uuidv4().slice(0, 4);
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

module.exports = upload;
