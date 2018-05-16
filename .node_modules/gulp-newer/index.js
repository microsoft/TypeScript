var Transform = require('stream').Transform;
var fs = require('fs');
var path = require('path');
var util = require('util');
var glob = require('glob');

var Q = require('kew');
var PluginError = require('plugin-error');

var PLUGIN_NAME = 'gulp-newer';

function Newer(options) {
  Transform.call(this, {objectMode: true});

  if (!options) {
    throw new PluginError(
      PLUGIN_NAME,
      'Requires a dest string or options object'
    );
  }

  if (typeof options === 'string') {
    options = {dest: options};
  } else if (options.dest && typeof options.dest !== 'string') {
    throw new PluginError(PLUGIN_NAME, 'Requires a dest string');
  }

  if (options.ext && typeof options.ext !== 'string') {
    throw new PluginError(PLUGIN_NAME, 'Requires ext to be a string');
  }

  if (options.map && typeof options.map !== 'function') {
    throw new PluginError(PLUGIN_NAME, 'Requires map to be a function');
  }

  if (!options.dest && !options.map) {
    throw new PluginError(
      PLUGIN_NAME,
      'Requires either options.dest or options.map or both'
    );
  }

  if (options.extra) {
    if (typeof options.extra === 'string') {
      options.extra = [options.extra];
    } else if (!Array.isArray(options.extra)) {
      throw new PluginError(
        PLUGIN_NAME,
        'Requires options.extra to be a string or array'
      );
    }
  }

  /**
   * Path to destination directory or file.
   * @type {string}
   */
  this._dest = options.dest;

  /**
   * Optional extension for destination files.
   * @type {string}
   */
  this._ext = options.ext;

  /**
   * Optional function for mapping relative source files to destination files.
   * @type {function(string): string}
   */
  this._map = options.map;

  /**
   * Promise for the dest file/directory stats.
   * @type {[type]}
   */
  this._destStats = this._dest
    ? Q.nfcall(fs.stat, this._dest)
    : Q.resolve(null);

  /**
   * If the provided dest is a file, we want to pass through all files if any
   * one of the source files is newer than the dest.  To support this, source
   * files need to be buffered until a newer file is found.  When a newer file
   * is found, buffered source files are flushed (and the `_all` flag is set).
   * @type {[type]}
   */
  this._bufferedFiles = null;

  /**
   * Indicates that all files should be passed through.  This is set when the
   * provided dest is a file and we have already encountered a newer source
   * file.  When true, all remaining source files should be passed through.
   * @type {boolean}
   */
  this._all = false;

  /**
   * Indicates that there are extra files (configuration files, etc.)
   * that are not to be fed into the stream, but that should force
   * all files to be rebuilt if *any* are older than one of the extra
   * files.
   */
  this._extraStats = null;

  if (options.extra) {
    var extraFiles = [];
    for (var i = 0; i < options.extra.length; ++i) {
      extraFiles.push(Q.nfcall(glob, options.extra[i]));
    }
    this._extraStats = Q.all(extraFiles)
      .then(function(fileArrays) {
        // First collect all the files in all the glob result arrays
        var allFiles = [];
        var i;
        for (i = 0; i < fileArrays.length; ++i) {
          allFiles = allFiles.concat(fileArrays[i]);
        }
        var extraStats = [];
        for (i = 0; i < allFiles.length; ++i) {
          extraStats.push(Q.nfcall(fs.stat, allFiles[i]));
        }
        return Q.all(extraStats);
      })
      .then(function(resolvedStats) {
        // We get all the file stats here; find the *latest* modification.
        var latestStat = resolvedStats[0];
        for (var j = 1; j < resolvedStats.length; ++j) {
          if (resolvedStats[j].mtime > latestStat.mtime) {
            latestStat = resolvedStats[j];
          }
        }
        return latestStat;
      })
      .fail(function(error) {
        if (error && error.path) {
          throw new PluginError(
            PLUGIN_NAME,
            'Failed to read stats for an extra file: ' + error.path
          );
        } else {
          throw new PluginError(
            PLUGIN_NAME,
            'Failed to stat extra files; unknown error: ' + error
          );
        }
      });
  }
}
util.inherits(Newer, Transform);

/**
 * Pass through newer files only.
 * @param {File} srcFile A vinyl file.
 * @param {string} encoding Encoding (ignored).
 * @param {function(Error, File)} done Callback.
 */
Newer.prototype._transform = function(srcFile, encoding, done) {
  if (!srcFile || !srcFile.stat) {
    done(new PluginError(PLUGIN_NAME, 'Expected a source file with stats'));
    return;
  }
  var self = this;
  Q.resolve([this._destStats, this._extraStats])
    .spread(function(destStats, extraStats) {
      if ((destStats && destStats.isDirectory()) || self._ext || self._map) {
        // stat dest/relative file
        var relative = srcFile.relative;
        var ext = path.extname(relative);
        var destFileRelative = self._ext
          ? relative.substr(0, relative.length - ext.length) + self._ext
          : relative;
        if (self._map) {
          destFileRelative = self._map(destFileRelative);
        }
        var destFileJoined = self._dest
          ? path.join(self._dest, destFileRelative)
          : destFileRelative;
        return Q.all([Q.nfcall(fs.stat, destFileJoined), extraStats]);
      } else {
        // wait to see if any are newer, then pass through all
        if (!self._bufferedFiles) {
          self._bufferedFiles = [];
        }
        return [destStats, extraStats];
      }
    })
    .fail(function(err) {
      if (err.code === 'ENOENT') {
        // dest file or directory doesn't exist, pass through all
        return Q.resolve([null, this._extraStats]);
      } else {
        // unexpected error
        return Q.reject(err);
      }
    })
    .spread(function(destFileStats, extraFileStats) {
      var newer = !destFileStats || srcFile.stat.mtime > destFileStats.mtime;
      // If *any* extra file is newer than a destination file, then ALL
      // are newer.
      if (extraFileStats && extraFileStats.mtime > destFileStats.mtime) {
        newer = true;
      }
      if (self._all) {
        self.push(srcFile);
      } else if (!newer) {
        if (self._bufferedFiles) {
          self._bufferedFiles.push(srcFile);
        }
      } else {
        if (self._bufferedFiles) {
          // flush buffer
          self._bufferedFiles.forEach(function(file) {
            self.push(file);
          });
          self._bufferedFiles.length = 0;
          // pass through all remaining files as well
          self._all = true;
        }
        self.push(srcFile);
      }
      done();
    })
    .fail(done)
    .end();
};

/**
 * Remove references to buffered files.
 * @param {function(Error)} done Callback.
 */
Newer.prototype._flush = function(done) {
  this._bufferedFiles = null;
  done();
};

/**
 * Only pass through source files that are newer than the provided destination.
 * @param {Object} options An options object or path to destination.
 * @return {Newer} A transform stream.
 */
module.exports = function(options) {
  return new Newer(options);
};
