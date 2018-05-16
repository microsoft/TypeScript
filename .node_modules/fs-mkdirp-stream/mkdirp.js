'use strict';

var path = require('path');

var fs = require('graceful-fs');

var MASK_MODE = parseInt('7777', 8);
var DEFAULT_DIR_MODE = parseInt('0777', 8);

function mkdirp(dirpath, customMode, callback) {
  if (typeof customMode === 'function') {
    callback = customMode;
    customMode = undefined;
  }

  var mode = customMode || (DEFAULT_DIR_MODE & ~process.umask());
  dirpath = path.resolve(dirpath);

  fs.mkdir(dirpath, mode, onMkdir);

  function onMkdir(mkdirErr) {
    if (!mkdirErr) {
      return fs.stat(dirpath, onStat);
    }

    switch (mkdirErr.code) {
      case 'ENOENT': {
        return mkdirp(path.dirname(dirpath), onRecurse);
      }

      case 'EEXIST': {
        return fs.stat(dirpath, onStat);
      }

      default: {
        return callback(mkdirErr);
      }
    }

    function onStat(statErr, stats) {
      if (statErr) {
        return callback(statErr);
      }

      if (!stats.isDirectory()) {
        return callback(mkdirErr);
      }

      // TODO: Is it proper to mask like this?
      if ((stats.mode & MASK_MODE) === mode) {
        return callback();
      }

      if (!customMode) {
        return callback();
      }

      fs.chmod(dirpath, mode, callback);
    }
  }

  function onRecurse(recurseErr) {
    if (recurseErr) {
      return callback(recurseErr);
    }

    mkdirp(dirpath, mode, callback);
  }
}

module.exports = mkdirp;
