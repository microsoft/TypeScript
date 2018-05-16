'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var isGlob = require('is-glob');
var resolveDir = require('resolve-dir');
var detect = require('detect-file');
var mm = require('micromatch');

/**
 * @param  {String|Array} `pattern` Glob pattern or file path(s) to match against.
 * @param  {Object} `options` Options to pass to [micromatch]. Note that if you want to start in a different directory than the current working directory, specify the `options.cwd` property here.
 * @return {String} Returns the first matching file.
 * @api public
 */

module.exports = function(patterns, options) {
  options = options || {};
  var cwd = path.resolve(resolveDir(options.cwd || ''));

  if (typeof patterns === 'string') {
    return lookup(cwd, [patterns], options);
  }

  if (!Array.isArray(patterns)) {
    throw new TypeError('findup-sync expects a string or array as the first argument.');
  }

  return lookup(cwd, patterns, options);
};

function lookup(cwd, patterns, options) {
  var len = patterns.length;
  var idx = -1;
  var res;

  while (++idx < len) {
    if (isGlob(patterns[idx])) {
      res = matchFile(cwd, patterns[idx], options);
    } else {
      res = findFile(cwd, patterns[idx], options);
    }
    if (res) {
      return res;
    }
  }

  var dir = path.dirname(cwd);
  if (dir === cwd) {
    return null;
  }
  return lookup(dir, patterns, options);
}

function matchFile(cwd, pattern, opts) {
  var isMatch = mm.matcher(pattern, opts);
  var files = tryReaddirSync(cwd);
  var len = files.length;
  var idx = -1;

  while (++idx < len) {
    var name = files[idx];
    var fp = path.join(cwd, name);
    if (isMatch(name) || isMatch(fp)) {
      return fp;
    }
  }
  return null;
}

function findFile(cwd, filename, options) {
  var fp = cwd ? path.resolve(cwd, filename) : filename;
  return detect(fp, options);
}

function tryReaddirSync(fp) {
  try {
    return fs.readdirSync(fp);
  } catch(err) {}
  return [];
}
