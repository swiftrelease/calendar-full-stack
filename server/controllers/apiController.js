const fs = require('fs');
const CalendarEvents = require('../models/calendarEventModel');
const Users = require('../models/userModel');


module.exports = function(app) {
  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, X-ApiToken');
    next();
  });

  app.use('/api/*', function(req, res, next) {
    if(!req.headers['x-apitoken'] &&
        (req.headers['access-control-request-headers'].indexOf('x-apitoken') === -1)) {
      res.status(403).json({error: 'No apiToken sent'});
    } else {
      next();
    }
  });

  app.get('/api/calendar', function(req, res) {
    Users.findOne({apiToken: req.headers['x-apitoken']}, function(err, user) {
      if(err) throw err;
      res.send(user.events);
    });
  });

  app.post('/api/calendar', function(req, res) {
    console.log('inside post handler');
    var newCalEvent = {
      start: req.body.start,
      duration: req.body.duration,
      title: req.body.title
    };
    Users.findOneAndUpdate({apiToken: req.headers['x-apitoken']},
          {$push: { events: newCalEvent }}, function(err, user) {
      if(err) throw err;
      res.status(200).send('[post] Success');
    });

    // var newCalEvent = CalendarEvents({
    //   start: req.body.start,
    //   duration: req.body.duration,
    //   title: req.body.title
    // });
    // newCalEvent.save(function(err) {
    //   if(err) throw err;
    //   res.send("[post] Success");
    // });
  });

  app.delete('/api/calendar', function(req, res) {
    Users.findOneAndUpdate({apiToken: req.headers['x-apitoken']},
            {events: {$pull: {_id: req.body.id}}}, function(err, data) {
              if(err) throw err;
              res.status(200).send("[delete] Success");
            });

    // CalendarEvents.findByIdAndRemove(req.body.id, function(err) {
    //   if(err) throw err;
    //   res.send("[delete] Success");
    // });
  });

  // app.get('api/export', function(req, res) {
  //   CalendarEvents.find({}, function(err, calEvents) {
  //     if(err) throw err;
  //     new Promise(function(resolve, reject) {
  //       fs.mkdir(`../user_data/admin`, err => {
  //         if(err) reject(err);
  //         resolve();
  //       });
  //     }).then(() => {
  //       CalendarEvents.find({}, function(err, calEvents) {
  //         if(err) throw err;
  //
  //       });
  //     }).catch(err => console.log(err));
  //   });
  // });
};
