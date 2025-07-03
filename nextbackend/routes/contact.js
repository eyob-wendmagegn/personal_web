const express = require('express');
const router = express.Router();
const { saveContact, getContact } = require('../controllers/contactController');

router.post('/save-contact', saveContact);
router.get('/get-contact/:email', getContact);

module.exports = router;