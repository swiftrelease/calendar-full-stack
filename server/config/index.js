var configValues = require('./config');

module.exports = {
  getDbConnectionString: function() {
    return `mongodb://${configValues.user}:${configValues.pass}@ds139219.mlab.com:39219/calendar`;
  }
};
