const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://narottam-singh:jftdefault@assetstracker-1n75z.mongodb.net/assetstracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(8000, () => {
      console.log('SERVER STARTED AND DATABASE CONNECTED')
    })
  })
  .catch(err => {
    console.log(err);
  })