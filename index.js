var moment = require('moment');
var parseDates = require('./lib/parse');

module.exports = function(options) {
  options = options || {};

  if (typeof options.formats === 'undefined') {
    options.formats = [moment.ISO_8601];
  }

  if (typeof options.strict === 'undefined') {
    options.strict = true;
  }

  return function(req, res, next) {
    req.query = parseDates(req.query, options);
    next();
  };
};
