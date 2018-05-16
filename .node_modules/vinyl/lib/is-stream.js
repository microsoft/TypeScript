'use strict';

function isStream(stream) {
  if (!stream) {
    return false;
  }

  if (typeof stream.pipe !== 'function') {
    return false;
  }

  return true;
}

module.exports = isStream;
