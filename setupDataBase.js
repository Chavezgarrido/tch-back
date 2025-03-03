const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const crearBaseDeDatos = async () => {
  const dbName = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;

  const connection = new Sequelize('postgres', user, password, {
    host: host,
    dialect: 'postgres',
  });

  try {
    await connection.authenticate();
    console.log('Conexión a PostgreSQL establecida con éxito.');

    await connection.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Base de datos "${dbName}" creada con éxito.`);
  } catch (error) {
    if (error.original.code === '42P04') {
      console.log(`La base de datos "${dbName}" ya existe.`);
    } else {
      console.error('Error al crear la base de datos:', error);
    }
  } finally {
    await connection.close();
  }
};

const insertarDatos = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Usuarios" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        "contraseña" VARCHAR(255) NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        tipo_usuario VARCHAR(50) NOT NULL,
        fecha_registro TIMESTAMP DEFAULT NOW(),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Categoria" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Productos" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        categoria VARCHAR(255) NOT NULL,
        precio DECIMAL NOT NULL,
        descripcion TEXT NOT NULL,
        stock INT NOT NULL,
        imagen_url TEXT NOT NULL,
        id_vendedor INT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `);

    const usuarios = [
      { email: 'juan.perez@example.com', contraseña: 'contraseña123', nombre: 'Juan', apellido: 'Pérez', tipo_usuario: 'comprador' },
      { email: 'maria.garcia@example.com', contraseña: 'contraseña123', nombre: 'María', apellido: 'García', tipo_usuario: 'comprador' },
      { email: 'luis.martinez@example.com', contraseña: 'contraseña123', nombre: 'Luis', apellido: 'Martínez', tipo_usuario: 'vendedor' },
      { email: 'ana.lopez@example.com', contraseña: 'contraseña123', nombre: 'Ana', apellido: 'López', tipo_usuario: 'comprador' },
      { email: 'carlos.sanchez@example.com', contraseña: 'contraseña123', nombre: 'Carlos', apellido: 'Sánchez', tipo_usuario: 'vendedor' },
    ];

    for (const usuario of usuarios) {
      await sequelize.query(`INSERT INTO "Usuarios" (email, "contraseña", nombre, apellido, tipo_usuario, fecha_registro, "createdAt", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), NOW())`, {
        bind: [usuario.email, usuario.contraseña, usuario.nombre, usuario.apellido, usuario.tipo_usuario],
      });
      console.log(`Usuario ${usuario.nombre} insertado con éxito.`);
    }

    const categorias = ['juegos-de-mesa', 'accesorios', 'cartas-y-sets'];
    for (const categoria of categorias) {
      await sequelize.query(`INSERT INTO "Categoria" (nombre, "createdAt", "updatedAt") VALUES ($1, NOW(), NOW())`, {
        bind: [categoria],
      });
      console.log(`Categoría ${categoria} insertada con éxito.`);
    }

    const productos = [
        { nombre: 'Carcassonne', categoria: 'juegos-de-mesa', precio: 21990, descripcion: 'Descripción del juego de mesa 1', stock: 1, imagen_url: 'https://www.weplay.cl/pub/media/wysiwyg/PRODUCTOS/IMAGENES/DEVIR/carcassonne-comp-1.jpg', id_vendedor: 1 },
        { nombre: 'Aventureros al tren', categoria: 'juegos-de-mesa', precio: 44990, descripcion: 'Descripción del juego de mesa 2', stock: 2, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/8/2/8249687171100_5.jpeg', id_vendedor: 2 },
        { nombre: 'Catan', categoria: 'juegos-de-mesa', precio: 32990, descripcion: 'Descripción del juego de mesa 3', stock: 1, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/8/4/84360172201000_8.jpeg', id_vendedor: 3 },
        { nombre: 'Cortex Challenge +', categoria: 'juegos-de-mesa', precio: 24990, descripcion: 'Descripción del juego de mesa 4', stock: 5, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/3/7/37700049363350_5.jpeg', id_vendedor: 4 },
        { nombre: 'Dixit', categoria: 'juegos-de-mesa', precio: 29990, descripcion: 'Descripción del juego de mesa 5', stock: 3, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/3/5/3558380083535_1.jpg', id_vendedor: 5 },
        { nombre: 'Pastelazo Martillazo', categoria: 'juegos-de-mesa', precio: 14990, descripcion: 'Descripción del juego de mesa 6', stock: 1, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/6/3/6305095757940.jpeg', id_vendedor: 6 },
        { nombre: 'Azul Pabellon de verano', categoria: 'juegos-de-mesa', precio: 39990, descripcion: 'Descripción del juego de mesa 7', stock: 2, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/8/4/84354076299290_1.jpeg', id_vendedor: 7 },
  
        { nombre: 'Portamazo Kali Darma MyL', categoria: 'accesorios', precio: 1890, descripcion: 'Descripción del accesorio 1', stock: 2, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/7/8/78046388723970_1.jpeg', id_vendedor: 3 },
        { nombre: 'Separadores STD x 10 Purpura', categoria: 'accesorios', precio: 1490, descripcion: 'Descripción del accesorio 2', stock: 1, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/4/2/4260250078914.jpg', id_vendedor: 3 },
        { nombre: 'Separadores STD x 10 Verde', categoria: 'accesorios', precio: 1490, descripcion: 'Descripción del accesorio 3', stock: 100, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/4/2/4260250077344.jpg', id_vendedor: 3 },
  
        { nombre: 'Sword and Shield Astral Radiance', categoria: 'cartas-y-sets', precio: 4490, descripcion: 'Descripción del set de cartas 1', stock: 15, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/5/0/5060705220375-01.jpg', id_vendedor: 1 },
        { nombre: 'Scarlet and Violet Paldea Evolved', categoria: 'cartas-y-sets', precio: 4490, descripcion: 'Descripción del set de cartas 2', stock: 12, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/0/8/0820650504136-01.jpg', id_vendedor: 2 },
        { nombre: 'Scarlet and Violet Stellar Crown', categoria: 'cartas-y-sets', precio: 5490, descripcion: 'Descripción del set de cartas 3', stock: 10, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/8/2/820650859007-01.jpg', id_vendedor: 3 },
        { nombre: 'MTG: Battle for Baldurs Gate', categoria: 'cartas-y-sets', precio: 7990, descripcion: 'Descripción del set de cartas 4', stock: 8, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/1/9/195166181356.jpg', id_vendedor: 4 },
        { nombre: 'YuGiOh Mystic Fighters', categoria: 'cartas-y-sets', precio: 2990, descripcion: 'Descripción del set de cartas 5', stock: 2, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/8/3/837178464820.jpeg', id_vendedor: 3 },
        { nombre: 'Scarlet and Violet Twilight Masquerade', categoria: 'cartas-y-sets', precio: 5490, descripcion: 'Descripción del set de cartas 6', stock: 4, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/8/2/820650853401-01.jpg', id_vendedor: 2 },
        { nombre: 'YuGiOh Evolucion del pendulo', categoria: 'cartas-y-sets', precio: 2190, descripcion: 'Descripción del set de cartas 7', stock: 20, imagen_url: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/4/0/40129275449830.jpeg', id_vendedor: 1 },
      ];
  
      for (const producto of productos) {
        await sequelize.query(`INSERT INTO "Productos" (nombre, categoria, precio, descripcion, stock, imagen_url, id_vendedor, "createdAt", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`, {
          bind: [producto.nombre, producto.categoria, producto.precio, producto.descripcion, producto.stock, producto.imagen_url, producto.id_vendedor],
        });
        console.log(`Producto ${producto.nombre} insertado con éxito.`);
      }
  
    } catch (error) {
      console.error('Error al insertar datos:', error);
    } finally {
      await sequelize.close();
    }
  };
  
  const main = async () => {
    await crearBaseDeDatos(); 
    await insertarDatos(); 
  };
  
  main();