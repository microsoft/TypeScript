/*!
 * object.map <https://github.com/jonschlinkert/object.map>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var makeIterator = require('make-iterator');
var forOwn = require('for-own');

module.exports = function(obj, fn, thisArg) {
  var iterator = makeIterator(fn, thisArg);
  var result = {};

  forOwn(obj, function(value, key, orig) {
    result[key] = iterator(value, key, orig);
  });

  return result;
};
