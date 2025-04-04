const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/revController.js');

router.get('/', reviewsController.getReviews);

module.exports = router;
