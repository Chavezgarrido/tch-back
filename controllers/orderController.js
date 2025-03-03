const { Pedido } = require('../models');

exports.getOrdersByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const pedidos = await Pedido.findAll({ where: { id_usuario: id } });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};

exports.getOrderById = async (req, res) => {
  const { id, pedido_id } = req.params;
  try {
    const pedido = await Pedido.findOne({ where: { id_usuario: id, id: pedido_id } });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedido' });
  }
};

