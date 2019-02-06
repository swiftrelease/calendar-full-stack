const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');

const app = express();

const port = 5000;

app.use(express.static(__dirname + '/build'));

app.use('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});


app.use(express.json());

mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true});

setupController(app);
apiController(app);

app.listen(port);
