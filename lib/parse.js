'use strict';

var moment = require('moment');

/**
 * Attempts to recursively convert object properties to dates.
 * @param  {Object}    obj              - Object to iterate over.
 * @param  {Object}    options          - Options.
 * @param  {Array}     options.formats  - Array of formats moment should accept.
 * @param  {Boolean}   options.strict   - Whether moment should parse in strict mode.
 * @return {Object}    Returns new object (shallow copy).
*/
function parse(obj, options) {
  var result = {},
      key,
      value,
      momentValue;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];

      if (typeof value === 'string' || typeof value === 'number') {
        momentValue = moment.call(null, value, options.formats, options.strict);

        if (momentValue.isValid()) {
          result[key] = momentValue.toDate();
        }
        else {
          result[key] = value;
        }
      }
      else if (value.constructor === Object) {
        result[key] = parse(value, options);
      }
      else {
        result[key] = value;
      }
    }
  }

  return result;
}

module.exports = parse;
