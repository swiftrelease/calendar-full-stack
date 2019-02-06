const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uname: String,
  pass: String,
  events: Array
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;
