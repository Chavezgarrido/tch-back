const express = require('express');
const cartController = require('../controllers/cartController'); 
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.post('/carrito/:id/agregar', authMiddleware, cartController.addToCart); 
router.delete('/carrito/:id/eliminar', authMiddleware, cartController.removeFromCart); 
router.post('/carrito/:id/finalizar', authMiddleware, cartController.finalizePurchase);

module.exports = router;