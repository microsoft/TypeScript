'use strict';

function inspectStream(stream) {
  var streamType = stream.constructor.name;
  // Avoid StreamStream
  if (streamType === 'Stream') {
    streamType = '';
  }

  return '<' + streamType + 'Stream>';
}

module.exports = inspectStream;
