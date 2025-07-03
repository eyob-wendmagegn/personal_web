const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type || (file.mimetype.startsWith('image/') ? 'image' : 'file');
    const dir = path.join(__dirname, '..', 'upload', type);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9-_.]/g, '_'));
  },
});

module.exports = multer({ storage });