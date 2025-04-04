const express = require('express');
const router = express.Router();
const docsController = require('../controllers/docController.js');

router.get('/', docsController.getDocs);

module.exports = router;
