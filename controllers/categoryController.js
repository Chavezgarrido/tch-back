const { Categoria } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
};