var CalendarEvents = require('../models/calendarEventModel');

module.exports = function(app) {
  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.get('/api/calendarEvents', function(req, res) {
    CalendarEvents.find({}, function(err, calEvents) {
      if(err) throw err;
      res.send(calEvents);
    });
  });

  app.post('/api/calendarEvents', function(req, res) {
    console.log(req.body);
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

  app.delete('/api/calendarEvents', function(req, res) {
    CalendarEvents.findByIdAndRemove(req.body.id, function(err) {
      if(err) throw err;
      res.send("[delete] Success");
    });
  });
};
