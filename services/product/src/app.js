const express = require('express');
const dotenv = require('dotenv');
// const productRoutes = require('./routes/api/products');
const productManagementRoutes = require('./routes/management/product');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.set('views', './src/views');
app.set('view engine', 'pug');
app.use(express.json());
// app.use('/api/', productRoutes);
app.use('/', productManagementRoutes);

module.exports = app;