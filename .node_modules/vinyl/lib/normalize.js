'use strict';

var path = require('path');

function normalize(str) {
  return str === '' ? str : path.normalize(str);
}

module.exports = normalize;
