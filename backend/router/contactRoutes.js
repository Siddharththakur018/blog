const express = require('express');
const router = express.Router();
const {protect,adminOnly} = require('../middleware/authMiddleware');
const {submitContact, getAllContacts, dropdownOptions} = require('../controller/contactController');

router.post('/contact-form',protect, submitContact);
router.get('/allcontacts',protect, adminOnly, getAllContacts);
router.get('/dropdown-options', dropdownOptions);


module.exports = router;