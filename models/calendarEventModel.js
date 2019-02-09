const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarEventSchema = new Schema([{
  start: Number,
  duration: Number,
  title: String
}]);

var CalendarEvents = mongoose.model('CalendarEvents', calendarEventSchema);

module.exports = CalendarEvents;
