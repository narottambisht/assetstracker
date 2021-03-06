require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes');
const miscRoutes = require('./routes/miscRoutes');
const clientRoutes = require('./routes/clientRoutes');
const { bootStraping } = require('./utils/misc');
const swaggerDocument = require('./swaggerDoc.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/auth', authRoutes);
app.use(miscRoutes);
app.use('/client', clientRoutes);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(process.env.PORT, () => {
      bootStraping();
      console.log(`SERVER STARTED AND DATABASE CONNECTED AT http://localhost:${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log(err);
  })