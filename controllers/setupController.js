const Users = require('../models/userModel');

module.exports = function(app) {
  app.get('/api/setup', function(req, res) {
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
    const starterUser = {
      uname: 'admin',
      pass: '00810cf8b94d6fcb9c5de484d3bec4187620b3e2876e59aab90d852fe0f18fb6',
      authToken: '123',
      apiToken: '123',
      events: starterEvents
    }
    Users.create(starterUser, function(err, results) {
      res.send(results);
    });
  });
}
