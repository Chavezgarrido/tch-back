const bcrypt = require('bcrypt');
const { Usuario } = require('../models'); 

const register = async (req, res) => {
    const { email, contraseña, nombre, apellido, tipo_usuario } = req.body;

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    try {
        const newUser  = await Usuario.create({
            email,
            contraseña: hashedPassword,
            nombre,
            apellido,
            tipo_usuario,
        });
        res.status(201).json({ message: 'Usuario creado', userId: newUser .id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

const login = async (req, res) => {
    const { email, contraseña } = req.body;

    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso', userId: user.id, email: user.email });
};

module.exports = { register, login };