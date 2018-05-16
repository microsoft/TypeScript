'use strict';

var once = require('once');

var helpers = require('./helpers');

function map(values, iterator, extensions, done) {
  // Allow for extensions to not be specified
  if (typeof extensions === 'function') {
    done = extensions;
    extensions = {};
  }

  // Handle no callback case
  if (typeof done !== 'function') {
    done = helpers.noop;
  }

  done = once(done);

  // Will throw if non-object
  var keys = Object.keys(values);
  var length = keys.length;
  var count = length;
  var idx = 0;
  // Return the same type as passed in
  var results = helpers.initializeResults(values);

  var exts = helpers.defaultExtensions(extensions);

  for (idx = 0; idx < length; idx++) {
    var key = keys[idx];
    next(key);
  }

  function next(key) {
    var value = values[key];

    var storage = exts.create(value, key) || {};

    exts.before(storage);
    iterator(value, key, once(handler));

    function handler(err, result) {
      if (err) {
        exts.error(err, storage);
        return done(err, results);
      }

      exts.after(result, storage);
      results[key] = result;
      if (--count === 0) {
        done(err, results);
      }
    }
  }
}

module.exports = map;
