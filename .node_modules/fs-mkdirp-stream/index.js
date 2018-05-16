'use strict';

var through = require('through2');

var mkdirp = require('./mkdirp');

function toFunction(dirpath) {
  function stringResolver(chunk, callback) {
    callback(null, dirpath);
  }

  return stringResolver;
}

function define(options) {

  function mkdirpStream(resolver) {
    // Handle resolver that's just a dirpath
    if (typeof resolver === 'string') {
      resolver = toFunction(resolver);
    }

    function makeFileDirs(chunk, enc, callback) {
      resolver(chunk, onDirpath);

      function onDirpath(dirpathErr, dirpath, mode) {
        if (dirpathErr) {
          return callback(dirpathErr);
        }

        mkdirp(dirpath, mode, onMkdirp);
      }

      function onMkdirp(mkdirpErr) {
        if (mkdirpErr) {
          return callback(mkdirpErr);
        }

        callback(null, chunk);
      }
    }

    return through(options, makeFileDirs);
  }

  return mkdirpStream;
}

module.exports = define();
module.exports.obj = define({ objectMode: true, highWaterMark: 16 });
