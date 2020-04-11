require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { bootStraping } = require('./utils/misc');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://narottam-singh:jftdefault@assetstracker-1n75z.mongodb.net/assetstracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(8000, () => {
      bootStraping();
      console.log('SERVER STARTED AND DATABASE CONNECTED')
    })
  })
  .catch(err => {
    console.log(err);
  })