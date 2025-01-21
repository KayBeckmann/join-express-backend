const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, contactController.createContact);
router.get('/', authMiddleware, contactController.getAllContacts);
router.put('/:id', authMiddleware, contactController.updateContact);
router.delete('/:id', authMiddleware, contactController.deleteContact);

module.exports = router;
