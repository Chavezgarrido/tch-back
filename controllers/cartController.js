const { Carrito, Pedido, Producto } = require('../models');

exports.addToCart = async (req, res) => {
  const { id } = req.params; 
  const { id_producto, cantidad } = req.body;

  try {
    const carrito = await Carrito.findOrCreate({ where: { id_usuario: id } });
    res.json({ mensaje: 'Producto agregado al carrito', carrito });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  const { id_producto } = req.body;

  try {
    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};

exports.finalizePurchase = async (req, res) => {
  const { id } = req.params; 
  const { direccion_envio, metodo_pago } = req.body;

  try {
    const carrito = await Carrito.findOne({ where: { id_usuario: id } });
    if (!carrito || !carrito.productos || carrito.productos.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    const nuevoPedido = await Pedido.create({
      id_usuario: id,
      direccion_envio,
      metodo_pago,
      detalles: carrito.productos, 
      total: carrito.productos.reduce((acc, producto) => acc + (producto.precio_unitario * producto.cantidad), 0), // Calcular el total
    });

    await Carrito.destroy({ where: { id_usuario: id } });

    res.json({ mensaje: 'Compra finalizada con éxito', pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ error: 'Error al finalizar la compra' });
  }
};