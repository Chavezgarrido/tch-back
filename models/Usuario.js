module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo_usuario: {
            type: DataTypes.ENUM('comprador', 'vendedor'),
            allowNull: false,
        },
        fecha_registro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    return Usuario;
};