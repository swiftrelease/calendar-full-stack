const fs = require('fs');
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
      if(err) {
        res.status(404).json({error: 'No user found'});
        return;
      }
      res.send(user.events);
    });
  });

  app.post('/api/calendar', function(req, res) {
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
  });

  app.delete('/api/calendar', function(req, res) {
    Users.findOne({apiToken: req.headers['x-apitoken']}, function(err, user) {
      if(err) throw err;
      if(!user) {
        res.status(404).json('No user found');
        return;
      }
      const updatedEvents = [...user.events];
      var eventFound = false;
      for(let i = 0; i < updatedEvents.length; i++) {
        if(String(updatedEvents[i]._id) === req.body.id) {
          updatedEvents.splice(i, 1);
          eventFound = true;
          break;
        }
      }
      user = {...user, events: updatedEvents};

      if(eventFound) {
        Users.findOneAndUpdate({apiToken: req.headers['x-apitoken']},
          {$set: {events: updatedEvents}}, function(err, user) {
            if(err) throw err;
            res.status(200).send("[delete] Success");
          });
      }
    });

  });
};
