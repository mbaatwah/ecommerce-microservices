// src/server.js
const express = require('express');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.use('/', userRoutes);

module.exports = app;