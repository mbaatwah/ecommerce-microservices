const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Auth Service listening at Port ${port}`);
});
