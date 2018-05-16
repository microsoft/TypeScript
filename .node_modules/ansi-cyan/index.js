/*!
 * ansi-cyan <https://github.com/jonschlinkert/ansi-cyan>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var wrap = require('ansi-wrap');

module.exports = function cyan(message) {
  return wrap(36, 39, message);
};
