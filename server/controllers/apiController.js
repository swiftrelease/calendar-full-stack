const fs = require('fs');
const CalendarEvents = require('../models/calendarEventModel');

module.exports = function(app) {
  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.get('/api/calendar', function(req, res) {
    CalendarEvents.find({}, function(err, calEvents) {
      if(err) throw err;
      res.send(calEvents);
    });
  });

  app.post('/api/calendar', function(req, res) {
    var newCalEvent = CalendarEvents({
      start: req.body.start,
      duration: req.body.duration,
      title: req.body.title
    });
    newCalEvent.save(function(err) {
      if(err) throw err;
      res.send("[post] Success");
    });
  });

  app.delete('/api/calendar', function(req, res) {
    CalendarEvents.findByIdAndRemove(req.body.id, function(err) {
      if(err) throw err;
      res.send("[delete] Success");
    });
  });

  app.get('api/export', function(req, res) {
    CalendarEvents.find({}, function(err, calEvents) {
      if(err) throw err;
      new Promise(function(resolve, reject) {
        fs.mkdir(`../user_data/admin`, err => {
          if(err) reject(err);
          resolve();
        });
      }).then(() => {
        CalendarEvents.find({}, function(err, calEvents) {
          if(err) throw err;
          
        });
      }).catch(err => console.log(err));
    });
  });
};
