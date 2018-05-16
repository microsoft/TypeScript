'use strict';

var Buffer = require('buffer').Buffer;

function hasFrom() {
  // Node versions 5.x below 5.10 seem to have a `from` method
  // However, it doesn't clone Buffers
  // Luckily, it reports as `false` to hasOwnProperty
  return (Buffer.hasOwnProperty('from') && typeof Buffer.from === 'function');
}

function cloneBuffer(buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new Error('Can only clone Buffer.');
  }

  if (hasFrom()) {
    return Buffer.from(buf);
  }

  var copy = new Buffer(buf.length);
  buf.copy(copy);
  return copy;
}

cloneBuffer.hasFrom = hasFrom;

module.exports = cloneBuffer;
