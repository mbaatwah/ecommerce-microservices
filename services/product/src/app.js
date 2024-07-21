const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const productRoutes = require('./routes/api/products');
const productManagementRoutes = require('./routes/management/product');

dotenv.config();



const app = express();
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
    console.info(`${req.method} ${req.url}`);
    next()
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './src/views');
app.set('view engine', 'pug');
app.use(express.json());
// app.use('/api/', productRoutes);
app.use('/', productManagementRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;