/*!
 * remove-bom-buffer <https://github.com/jonschlinkert/remove-bom-buffer>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var isUTF8 = require('is-utf8');
var isBuffer = require('is-buffer');

function matchBOM(buf) {
  return buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
}

function maybeUTF8(buf) {
  // Only "maybe" because we aren't sniffing the whole buffer
  return isUTF8(buf.slice(3, 7));
}

module.exports = function(buf) {
  if (isBuffer(buf) && matchBOM(buf) && maybeUTF8(buf)) {
    return buf.slice(3);
  }
  return buf;
};
