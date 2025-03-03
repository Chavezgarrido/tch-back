const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/usuarios/:id/pedidos', authMiddleware, orderController.getOrdersByUserId); 
router.get('/usuarios/:id/pedidos/:pedido_id', authMiddleware, orderController.getOrderById); 

module.exports = router;