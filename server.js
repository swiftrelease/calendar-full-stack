const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const authController = require('./controllers/authController');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/build'));

app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type,apiToken');
  next();
});

app.use(express.json());

mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true});

authController(app);
setupController(app);
apiController(app);

app.listen(PORT);
