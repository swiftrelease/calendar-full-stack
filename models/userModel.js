const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uname: String,
  pass: String,
  authToken: String,
  apiToken: String,
  events: [{
    start: Number,
    duration: Number,
    title: String
  }]
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;
