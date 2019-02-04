const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');

const app = express();

const port = 5000;

app.use('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

app.get('/calendar', (req, res) => {
  fs.readFile(__dirname + '/data/events.json', {encoding: 'utf8'}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.set('Content-Type', 'application/json');
    res.send(JSON.parse(data));
  });
});

mongoose.connect(config.getDbConnectionString());

setupController(app);
apiController(app);

app.listen(port);
