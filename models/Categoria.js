module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return Categoria;
  };