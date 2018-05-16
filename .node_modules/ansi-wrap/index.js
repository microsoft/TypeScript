'use strict';

module.exports = function(a, b, msg) {
  return '\u001b['+ a + 'm' + msg + '\u001b[' + b + 'm';
};
