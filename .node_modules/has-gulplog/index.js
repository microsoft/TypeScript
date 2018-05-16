'use strict';

var sparkles = require('sparkles');

function hasGulplog(){
  return sparkles.exists('gulplog');
}

module.exports = hasGulplog;
