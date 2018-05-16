/*!
 * plugin-error <https://github.com/jonschlinkert/plugin-error>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var util = require('util');
var red = require('ansi-red');
var cyan = require('ansi-cyan');
var extend = require('extend-shallow');
var differ = require('arr-diff');
var union = require('arr-union');

/**
 * Based on gulp-util PluginError (MIT Licensed)
 * See: https://github.com/wearefractal/gulp-util
 */

var nonEnum = ['message', 'name', 'stack'];
var ignored = union(nonEnum, ['__safety', '_stack', 'plugin', 'showProperties', 'showStack']);
var props = ['fileName', 'lineNumber', 'message', 'name', 'plugin', 'showProperties', 'showStack', 'stack'];

function PluginError(plugin, message, options) {
  if (!(this instanceof PluginError)) {
    throw new Error('Call PluginError using new');
  }

  Error.call(this);
  var opts = setDefaults(plugin, message, options);
  var self = this;

  // if opts has an error, get details from it
  if (typeof opts.error === 'object') {
    var keys = union(Object.keys(opts.error), nonEnum);

    // These properties are not enumerable, so we have to add them explicitly.
    keys.forEach(function(prop) {
      self[prop] = opts.error[prop];
    });
  }

  // opts object can override
  props.forEach(function(prop) {
    if (prop in opts) this[prop] = opts[prop];
  }, this);

  // defaults
  if (!this.name) this.name = 'Error';
  if (!this.stack) {

    /**
     * `Error.captureStackTrace` appends a stack property which
     * relies on the toString method of the object it is applied to.
     *
     * Since we are using our own toString method which controls when
     * to display the stack trace, if we don't go through this safety
     * object we'll get stack overflow problems.
     */

    var safety = {};
    safety.toString = function() {
      return this._messageWithDetails() + '\nStack:';
    }.bind(this);

    Error.captureStackTrace(safety, arguments.callee || this.constructor);
    this.__safety = safety;
  }
  if (!this.plugin) throw new Error('Missing plugin name');
  if (!this.message) throw new Error('Missing error message');
}

util.inherits(PluginError, Error);

/**
 * Output a formatted message with details
 */

PluginError.prototype._messageWithDetails = function() {
  var msg = 'Message:\n    ' + this.message;
  var details = this._messageDetails();
  if (details !== '') msg += '\n' + details;
  return msg;
};

/**
 * Output actual message details
 */

PluginError.prototype._messageDetails = function() {
  if (!this.showProperties) return '';

  var props = differ(Object.keys(this), ignored);
  var len = props.length;

  if (len === 0) return '';

  var res = '', i = 0;
  while (len--) {
    var prop = props[i++];
    res += '    ';
    res += prop + ': ' + this[prop];
    res += '\n';
  }
  return 'Details:\n' + res;
};

/**
 * Override the `toString` method
 */

PluginError.prototype.toString = function () {
  var detailsWithStack = function(stack) {
    return this._messageWithDetails() + '\nStack:\n' + stack;
  }.bind(this);

  var msg = '';
  if (this.showStack) {
    // if there is no wrapped error, use the stack captured in the PluginError ctor
    if (this.__safety) {
      msg = this.__safety.stack;

    } else if (this._stack) {
      msg = detailsWithStack(this._stack);

    } else {
      // Stack from wrapped error
      msg = detailsWithStack(this.stack);
    }
    return message(msg, this);
    }

  msg = this._messageWithDetails();
  return message(msg, this);
};

// format the output message
function message(msg, thisArg) {
  var sig = red(thisArg.name);
  sig += ' in plugin ';
  sig += '"' + cyan(thisArg.plugin) + '"';
  sig += '\n';
  sig += msg;
  return sig;
}

/**
 * Set default options based on arguments.
 */

function setDefaults(plugin, message, opts) {
  if (typeof plugin === 'object') {
    return defaults(plugin);
  }
  opts = opts || {};
  if (message instanceof Error) {
    opts.error = message;
  } else if (typeof message === 'object') {
    opts = message;
  } else {
    opts.message = message;
  }
  opts.plugin = plugin;
  return defaults(opts);
}

/**
 * Extend default options with:
 *
 *  - `showStack`: default=false
 *  - `showProperties`: default=true
 *
 * @param  {Object} `opts` Options to extend
 * @return {Object}
 */

function defaults(opts) {
  return extend({showStack: false, showProperties: true}, opts);
}

/**
 * Expose `PluginError`
 */

module.exports = PluginError;
