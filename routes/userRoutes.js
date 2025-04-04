const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController.js');

router.get('/', usersController.getUsers);

module.exports = router;
