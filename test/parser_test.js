'use strict';

var parser = require('../lib/parse');
var moment = require('moment');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.parser = {
  setUp: function(done) {
    this.options = {
      formats: ['x', moment.ISO_8601],
      strict: true
    };

    done();
  },

  milliseconds: function(test) {
    test.deepEqual(
      parser({
        a: 1420088400000
      }, this.options),
      {
        a: new Date(1420088400000)
      },
      'Converts milliseconds.'
    );

    test.done();
  },

  millisecondsString: function(test) {
    test.deepEqual(
      parser({
        a: '1420088400000'
      }, this.options),
      {
        a: new Date(1420088400000)
      },
      'Converts millisecond string.'
    );

    test.done();
  },

  iso: function(test) {
    test.deepEqual(
      parser({
        a: '2015-01-01T05:00:00.000Z'
      }, this.options),
      {
        a: new Date(1420088400000)
      },
      'Converts ISO 8601 date string.'
    );

    test.done();
  },

  nested: function(test) {
    test.deepEqual(
      parser({
        a: {
          b: '2015-01-01T05:00:00.000Z'
        }
      }, this.options),
      {
        a: {
          b: new Date(1420088400000)
        }
      },
      'Recursively parses object.'
    );

    test.done();
  },

  randomString: function(test) {
    test.deepEqual(
      parser({
        a: 'abc'
      }, this.options),
      {
        a: 'abc'
      },
      'Does NOT convert invalid strings.'
    );

    test.done();
  }

};
