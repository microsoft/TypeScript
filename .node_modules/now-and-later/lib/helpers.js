'use strict';

function noop() {}

var defaultExts = {
  create: noop,
  before: noop,
  after: noop,
  error: noop,
};

function defaultExtensions(extensions) {
  extensions = extensions || {};
  return {
    create: extensions.create || defaultExts.create,
    before: extensions.before || defaultExts.before,
    after: extensions.after || defaultExts.after,
    error: extensions.error || defaultExts.error,
  };
}

function initializeResults(values) {
  var keys = Object.keys(values);
  var results = Array.isArray(values) ? [] : {};

  var idx = 0;
  var length = keys.length;

  for (idx = 0; idx < length; idx++) {
    var key = keys[idx];
    results[key] = undefined;
  }

  return results;
}

module.exports = {
  defaultExtensions: defaultExtensions,
  noop: noop,
  initializeResults: initializeResults,
};
