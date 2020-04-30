const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    const date = moment().format('YYYY.MM.DD_HH-mm-ss-SSS');
    cb(null, `${date}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const validMimetypeList = [
    'image/png',
    'image/jpg',
    'image/jpeg',
  ];
  const isValidImageFile = validMimetypeList.includes(file.mimetype);
  cb(null, isValidImageFile);
}

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  fileFilter,
  limits,
});
