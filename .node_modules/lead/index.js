'use strict';

var Writable = require('flush-write-stream');

function listenerCount(stream, evt) {
  return stream.listeners(evt).length;
}

function hasListeners(stream) {
  return !!(listenerCount(stream, 'readable') || listenerCount(stream, 'data'));
}

function sinker(file, enc, callback) {
  callback();
}

function sink(stream) {
  var sinkAdded = false;

  var sinkOptions = {
    objectMode: stream._readableState.objectMode,
  };

  var sinkStream = new Writable(sinkOptions, sinker);

  function addSink() {
    if (sinkAdded) {
      return;
    }

    if (hasListeners(stream)) {
      return;
    }

    sinkAdded = true;
    stream.pipe(sinkStream);
  }

  function removeSink(evt) {
    if (evt !== 'readable' && evt !== 'data') {
      return;
    }

    if (hasListeners(stream)) {
      sinkAdded = false;
      stream.unpipe(sinkStream);
    }
  }

  stream.on('newListener', removeSink);
  stream.on('removeListener', removeSink);
  stream.on('removeListener', addSink);

  // Sink the stream to start flowing
  // Do this on nextTick, it will flow at slowest speed of piped streams
  process.nextTick(addSink);

  return stream;
}

module.exports = sink;
