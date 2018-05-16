'use strict';

var through = require('through2');
var normalizePath = require('normalize-path');

var generate = require('./lib/generate');

function identityMap() {

  function transform(file, _, cb) {
    if (!file.sourceMap || !file.isBuffer()) {
      return cb(null, file);
    }

    var sourcePath = normalizePath(file.relative);
    var contents = file.contents.toString();

    switch (file.extname) {
      case '.js': {
        file.sourceMap = generate.js(sourcePath, contents);
        break;
      }
      case '.css': {
        file.sourceMap = generate.css(sourcePath, contents);
        break;
      }
    }

    cb(null, file);
  }

  return through.obj(transform);
}

module.exports = identityMap;
