'use strict';
var utils = require('../utils');
var through = require('through2');
var unixStylePath = utils.unixStylePath;
var internalsInit = require('./index.internals');

/**
 * Write the source map
 *
 * @param options options to change the way the source map is written
 *
 */
function write(destPath, options) {
  var debug = require('../debug').spawn('write');

  debug(function() { return "destPath"; });
  debug(function() { return destPath; });

  debug(function() { return "original options";});
  debug(function() { return options; });

  if (options === undefined && typeof destPath !== 'string') {
    options = destPath;
    destPath = undefined;
  }
  options = options || {};

  // set defaults for options if unset
  if (options.includeContent === undefined)
    options.includeContent = true;
  if (options.addComment === undefined)
    options.addComment = true;
  if (options.charset === undefined)
    options.charset = "utf8";

  debug(function() { return "derrived options"; });
  debug(function() { return options; });

  var internals = internalsInit(destPath, options);

  function sourceMapWrite(file, encoding, callback) {
    /*jshint validthis:true */

    if (file.isNull() || !file.sourceMap) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      return callback(new Error(utils.PLUGIN_NAME + '-write: Streaming not supported'));
    }

    // fix paths if Windows style paths
    file.sourceMap.file = unixStylePath(file.relative);

    internals.setSourceRoot(file);
    internals.loadContent(file);
    internals.mapSources(file);
    internals.mapDestPath(file, this);

    this.push(file);
    callback();
  }



  return through.obj(sourceMapWrite);
}

module.exports = write;
