const uuidv1 = require('uuid/v1');
const Users = require('../models/userModel');

module.exports = function(app) {

  app.post('/auth', function(req, res) {

    // Authorize user with a token
    if(req.body.authToken) {
      Users.findOne({authToken: req.body.authToken}, function(err, user) {
        if(err) throw err;
        if(!user) {
          res.status(403).json({error: 'Invalid authToken'});
        } else {
          res.status(200)
             .json({uname: user.uname, apiToken: user.apiToken})
             .end();
        }
      });
      return;
    }

    // Requests without a token or uname/pass should be ignored
    if(!req.body.uname || !req.body.pass) {
      res.status(400).json({error: 'Bad request'});
      return;
    }

    // Handle login/registration with uname/pass
    Users.findOne({uname: req.body.uname}, function(err, user) {
      if(err) throw err;
      if(!user) {
        // console.log('no user');
        const authToken = uuidv1();
        const apiToken = uuidv1();
        Users.create({
          uname: req.body.uname,
          pass: req.body.pass,
          authToken: authToken,
          apiToken: apiToken,
          events: []
        }, function(err, results) {
          if(err) throw err;
          res.status(200).json({
            uname: results.uname,
            authToken: results.authToken,
            apiToken: results.apiToken,
            action: 'register'
          });
        });
      } else if(req.body.pass === user.pass) {
        const authToken = uuidv1();
        const apiToken = uuidv1();
        Users.findByIdAndUpdate(user._id, { $set: {
          authToken: authToken,
          apiToken: apiToken
        }}, {new: true}, function(err, updatedUser) {
          if(err) throw err;
          res.status(200).json({
            authToken: updatedUser.authToken,
            apiToken: updatedUser.apiToken,
            action: 'login'
          });
        });
      } else {
        res.status(403).json({error: 'Invalid password'});
      }
    });
  });

}
