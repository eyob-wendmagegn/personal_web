const express = require('express');
const router = express.Router();
const { saveContent, deleteContent, getContent } = require('../controllers/contentController');

router.post('/save-content', saveContent);
router.delete('/delete-content/:email/:type/:id', deleteContent);
router.get('/get-content/:email/:type', getContent);

module.exports = router;