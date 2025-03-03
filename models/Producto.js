const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Producto extends Model {}

  Producto.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_vendedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Producto',
    timestamps: true,
  });

  return Producto;
};