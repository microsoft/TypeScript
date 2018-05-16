/*!
 * ansi-gray <https://github.com/jonschlinkert/ansi-gray>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var wrap = require('ansi-wrap');

module.exports = function gray(message) {
  return wrap(90, 39, message);
};
