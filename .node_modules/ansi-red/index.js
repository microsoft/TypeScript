/*!
 * ansi-red <https://github.com/jonschlinkert/ansi-red>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var wrap = require('ansi-wrap');

module.exports = function red(message) {
  return wrap(31, 39, message);
};
