var CalendarEvents = require('../models/calendarEventModel').CalendarEvents;

module.exports = function(app) {
  app.get('/api/setupCalendarEvents', function(req, res) {
    // seed database
    const starterEvents = [
      {
        start: 0,
        duration: 15,
        title: "Exercise"
      }, {
        start: 25,
        duration: 30,
        title: "Travel to work"
      }, {
        start: 30,
        duration: 30,
        title: "Plan day"
      }, {
        start: 60,
        duration: 15,
        title: "Review yesterday's commits"
      }, {
        start: 100,
        duration: 15,
        title: "Code review"
      }, {
        start: 180,
        duration: 90,
        title: "Have lunch with John"
      }, {
        start: 360,
        duration: 30,
        title: "Skype call"
      }, {
        start: 370,
        duration: 45,
        title: "Follow up with designer"
      }, {
        start: 405,
        duration: 30,
        title: "Push up branch"
      }
    ];
    CalendarEvents.create(starterEvents, function(err, results) {
      res.send(results);
    });
  });
}
