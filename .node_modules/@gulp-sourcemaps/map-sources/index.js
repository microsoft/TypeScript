'use strict';

var through = require('through2');
var normalize = require('normalize-path');

function mapSources(mapFn) {

  function transform(file, _, cb) {
    if (!file.sourceMap || !file.sourceMap.sources) {
      return cb(null, file);
    }

    function mapper(sourcePath) {
      var result = sourcePath;
      if (typeof mapFn === 'function') {
        result = mapFn(sourcePath, file);
      }

      return normalize(result);
    }

    file.sourceMap.sources = file.sourceMap.sources.map(mapper);

    cb(null, file);
  }

  return through.obj(transform);
}

module.exports = mapSources;
