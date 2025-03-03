const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

module.exports = router;