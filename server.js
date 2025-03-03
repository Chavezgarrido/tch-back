const express = require('express');
const cors = require('cors');
const path = require('path'); 
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes); 

app.use('/api', productRoutes); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });