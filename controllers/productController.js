const { Producto } = require('../models');

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id); 
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' }); 
    }
    res.json(producto); 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' }); 
  }
};