const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const Usuario = require('../models/Usuario')(sequelize, DataTypes);
const Producto = require('../models/Producto')(sequelize, DataTypes);
const Categoria = require('../models/Categoria')(sequelize, DataTypes);


module.exports = {
  sequelize,
  Usuario,
  Producto,
  Categoria,
};