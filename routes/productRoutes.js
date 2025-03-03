const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/producto/:id', authMiddleware, productController.getProductById); 

module.exports = router;