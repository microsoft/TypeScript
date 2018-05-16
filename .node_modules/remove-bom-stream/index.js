'use strict';

var through = require('through2');
var removeBom = require('remove-bom-buffer');
var SafeBuffer = require('safe-buffer').Buffer;

function removeBomStream() {
  var completed = false;
  var buffer = SafeBuffer.alloc(0);

  return through(onChunk, onFlush);

  function removeAndCleanup(data) {
    completed = true;

    buffer = null;

    return removeBom(data);
  }

  function onChunk(data, enc, cb) {
    if (completed) {
      return cb(null, data);
    }

    if (data.length >= 7) {
      return cb(null, removeAndCleanup(data));
    }

    var bufferLength = buffer.length;
    var chunkLength = data.length;
    var totalLength = bufferLength + chunkLength;

    buffer = SafeBuffer.concat([buffer, data], totalLength);

    if (totalLength >= 7) {
      return cb(null, removeAndCleanup(buffer));
    }
    cb();
  }

  function onFlush(cb) {
    if (completed || !buffer) {
      return cb();
    }

    cb(null, removeAndCleanup(buffer));
  }
}

module.exports = removeBomStream;
