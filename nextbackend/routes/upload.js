const express = require('express');
const router = express.Router();
const upload = require('../utils/storage');
const { uploadFile, getUploads, deleteUpload } = require('../controllers/uploadController');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/uploads/:email', getUploads);
router.delete('/delete-upload/:email/:id', deleteUpload);

module.exports = router;