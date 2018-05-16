'use strict';

/**
 * @module
 */

/**
 * Module dependencies.
 */

var debug = require('debug')('mocha:watch');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var join = path.join;
var he = require('he');

/**
 * Ignored directories.
 */

var ignore = ['node_modules', '.git'];

exports.inherits = require('util').inherits;

/**
 * Escape special characters in the given string of html.
 *
 * @api private
 * @param  {string} html
 * @return {string}
 */
exports.escape = function (html) {
  return he.encode(String(html), { useNamedReferences: false });
};

/**
 * Test if the given obj is type of string.
 *
 * @api private
 * @param {Object} obj
 * @return {boolean}
 */
exports.isString = function (obj) {
  return typeof obj === 'string';
};

/**
 * Watch the given `files` for changes
 * and invoke `fn(file)` on modification.
 *
 * @api private
 * @param {Array} files
 * @param {Function} fn
 */
exports.watch = function (files, fn) {
  var options = { interval: 100 };
  files.forEach(function (file) {
    debug('file %s', file);
    fs.watchFile(file, options, function (curr, prev) {
      if (prev.mtime < curr.mtime) {
        fn(file);
      }
    });
  });
};

/**
 * Ignored files.
 *
 * @api private
 * @param {string} path
 * @return {boolean}
 */
function ignored (path) {
  return !~ignore.indexOf(path);
}

/**
 * Lookup files in the given `dir`.
 *
 * @api private
 * @param {string} dir
 * @param {string[]} [ext=['.js']]
 * @param {Array} [ret=[]]
 * @return {Array}
 */
exports.files = function (dir, ext, ret) {
  ret = ret || [];
  ext = ext || ['js'];

  var re = new RegExp('\\.(' + ext.join('|') + ')$');

  fs.readdirSync(dir)
    .filter(ignored)
    .forEach(function (path) {
      path = join(dir, path);
      if (fs.lstatSync(path).isDirectory()) {
        exports.files(path, ext, ret);
      } else if (path.match(re)) {
        ret.push(path);
      }
    });

  return ret;
};

/**
 * Compute a slug from the given `str`.
 *
 * @api private
 * @param {string} str
 * @return {string}
 */
exports.slug = function (str) {
  return str
    .toLowerCase()
    .replace(/ +/g, '-')
    .replace(/[^-\w]/g, '');
};

/**
 * Strip the function definition from `str`, and re-indent for pre whitespace.
 *
 * @param {string} str
 * @return {string}
 */
exports.clean = function (str) {
  str = str
    .replace(/\r\n?|[\n\u2028\u2029]/g, '\n').replace(/^\uFEFF/, '')
    // (traditional)->  space/name     parameters    body     (lambda)-> parameters       body   multi-statement/single          keep body content
    .replace(/^function(?:\s*|\s+[^(]*)\([^)]*\)\s*\{((?:.|\n)*?)\s*\}$|^\([^)]*\)\s*=>\s*(?:\{((?:.|\n)*?)\s*\}|((?:.|\n)*))$/, '$1$2$3');

  var spaces = str.match(/^\n?( *)/)[1].length;
  var tabs = str.match(/^\n?(\t*)/)[1].length;
  var re = new RegExp('^\n?' + (tabs ? '\t' : ' ') + '{' + (tabs || spaces) + '}', 'gm');

  str = str.replace(re, '');

  return str.trim();
};

/**
 * Parse the given `qs`.
 *
 * @api private
 * @param {string} qs
 * @return {Object}
 */
exports.parseQuery = function (qs) {
  return qs.replace('?', '').split('&').reduce(function (obj, pair) {
    var i = pair.indexOf('=');
    var key = pair.slice(0, i);
    var val = pair.slice(++i);

    // Due to how the URLSearchParams API treats spaces
    obj[key] = decodeURIComponent(val.replace(/\+/g, '%20'));

    return obj;
  }, {});
};

/**
 * Highlight the given string of `js`.
 *
 * @api private
 * @param {string} js
 * @return {string}
 */
function highlight (js) {
  return js
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')
    .replace(/('.*?')/gm, '<span class="string">$1</span>')
    .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
    .replace(/(\d+)/gm, '<span class="number">$1</span>')
    .replace(/\bnew[ \t]+(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')
    .replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>');
}

/**
 * Highlight the contents of tag `name`.
 *
 * @api private
 * @param {string} name
 */
exports.highlightTags = function (name) {
  var code = document.getElementById('mocha').getElementsByTagName(name);
  for (var i = 0, len = code.length; i < len; ++i) {
    code[i].innerHTML = highlight(code[i].innerHTML);
  }
};

/**
 * If a value could have properties, and has none, this function is called,
 * which returns a string representation of the empty value.
 *
 * Functions w/ no properties return `'[Function]'`
 * Arrays w/ length === 0 return `'[]'`
 * Objects w/ no properties return `'{}'`
 * All else: return result of `value.toString()`
 *
 * @api private
 * @param {*} value The value to inspect.
 * @param {string} typeHint The type of the value
 * @returns {string}
 */
function emptyRepresentation (value, typeHint) {
  switch (typeHint) {
    case 'function':
      return '[Function]';
    case 'object':
      return '{}';
    case 'array':
      return '[]';
    default:
      return value.toString();
  }
}

/**
 * Takes some variable and asks `Object.prototype.toString()` what it thinks it
 * is.
 *
 * @api private
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * @param {*} value The value to test.
 * @returns {string} Computed type
 * @example
 * type({}) // 'object'
 * type([]) // 'array'
 * type(1) // 'number'
 * type(false) // 'boolean'
 * type(Infinity) // 'number'
 * type(null) // 'null'
 * type(new Date()) // 'date'
 * type(/foo/) // 'regexp'
 * type('type') // 'string'
 * type(global) // 'global'
 * type(new String('foo') // 'object'
 */
var type = exports.type = function type (value) {
  if (value === undefined) {
    return 'undefined';
  } else if (value === null) {
    return 'null';
  } else if (Buffer.isBuffer(value)) {
    return 'buffer';
  }
  return Object.prototype.toString.call(value)
    .replace(/^\[.+\s(.+?)]$/, '$1')
    .toLowerCase();
};

/**
 * Stringify `value`. Different behavior depending on type of value:
 *
 * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.
 * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.
 * - If `value` is an *empty* object, function, or array, return result of function
 *   {@link emptyRepresentation}.
 * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of
 *   JSON.stringify().
 *
 * @api private
 * @see exports.type
 * @param {*} value
 * @return {string}
 */
exports.stringify = function (value) {
  var typeHint = type(value);

  if (!~['object', 'array', 'function'].indexOf(typeHint)) {
    if (typeHint === 'buffer') {
      var json = Buffer.prototype.toJSON.call(value);
      // Based on the toJSON result
      return jsonStringify(json.data && json.type ? json.data : json, 2)
        .replace(/,(\n|$)/g, '$1');
    }

    // IE7/IE8 has a bizarre String constructor; needs to be coerced
    // into an array and back to obj.
    if (typeHint === 'string' && typeof value === 'object') {
      value = value.split('').reduce(function (acc, char, idx) {
        acc[idx] = char;
        return acc;
      }, {});
      typeHint = 'object';
    } else {
      return jsonStringify(value);
    }
  }

  for (var prop in value) {
    if (Object.prototype.hasOwnProperty.call(value, prop)) {
      return jsonStringify(exports.canonicalize(value, null, typeHint), 2).replace(/,(\n|$)/g, '$1');
    }
  }

  return emptyRepresentation(value, typeHint);
};

/**
 * like JSON.stringify but more sense.
 *
 * @api private
 * @param {Object}  object
 * @param {number=} spaces
 * @param {number=} depth
 * @returns {*}
 */
function jsonStringify (object, spaces, depth) {
  if (typeof spaces === 'undefined') {
    // primitive types
    return _stringify(object);
  }

  depth = depth || 1;
  var space = spaces * depth;
  var str = Array.isArray(object) ? '[' : '{';
  var end = Array.isArray(object) ? ']' : '}';
  var length = typeof object.length === 'number' ? object.length : Object.keys(object).length;
  // `.repeat()` polyfill
  function repeat (s, n) {
    return new Array(n).join(s);
  }

  function _stringify (val) {
    switch (type(val)) {
      case 'null':
      case 'undefined':
        val = '[' + val + ']';
        break;
      case 'array':
      case 'object':
        val = jsonStringify(val, spaces, depth + 1);
        break;
      case 'boolean':
      case 'regexp':
      case 'symbol':
      case 'number':
        val = val === 0 && (1 / val) === -Infinity // `-0`
          ? '-0'
          : val.toString();
        break;
      case 'date':
        var sDate = isNaN(val.getTime()) ? val.toString() : val.toISOString();
        val = '[Date: ' + sDate + ']';
        break;
      case 'buffer':
        var json = val.toJSON();
        // Based on the toJSON result
        json = json.data && json.type ? json.data : json;
        val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';
        break;
      default:
        val = (val === '[Function]' || val === '[Circular]')
          ? val
          : JSON.stringify(val); // string
    }
    return val;
  }

  for (var i in object) {
    if (!Object.prototype.hasOwnProperty.call(object, i)) {
      continue; // not my business
    }
    --length;
    str += '\n ' + repeat(' ', space) +
      (Array.isArray(object) ? '' : '"' + i + '": ') + // key
      _stringify(object[i]) + // value
      (length ? ',' : ''); // comma
  }

  return str +
    // [], {}
    (str.length !== 1 ? '\n' + repeat(' ', --space) + end : end);
}

/**
 * Return a new Thing that has the keys in sorted order. Recursive.
 *
 * If the Thing...
 * - has already been seen, return string `'[Circular]'`
 * - is `undefined`, return string `'[undefined]'`
 * - is `null`, return value `null`
 * - is some other primitive, return the value
 * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method
 * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.
 * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`
 *
 * @api private
 * @see {@link exports.stringify}
 * @param {*} value Thing to inspect.  May or may not have properties.
 * @param {Array} [stack=[]] Stack of seen values
 * @param {string} [typeHint] Type hint
 * @return {(Object|Array|Function|string|undefined)}
 */
exports.canonicalize = function canonicalize (value, stack, typeHint) {
  var canonicalizedObj;
  /* eslint-disable no-unused-vars */
  var prop;
  /* eslint-enable no-unused-vars */
  typeHint = typeHint || type(value);
  function withStack (value, fn) {
    stack.push(value);
    fn();
    stack.pop();
  }

  stack = stack || [];

  if (stack.indexOf(value) !== -1) {
    return '[Circular]';
  }

  switch (typeHint) {
    case 'undefined':
    case 'buffer':
    case 'null':
      canonicalizedObj = value;
      break;
    case 'array':
      withStack(value, function () {
        canonicalizedObj = value.map(function (item) {
          return exports.canonicalize(item, stack);
        });
      });
      break;
    case 'function':
      /* eslint-disable guard-for-in */
      for (prop in value) {
        canonicalizedObj = {};
        break;
      }
      /* eslint-enable guard-for-in */
      if (!canonicalizedObj) {
        canonicalizedObj = emptyRepresentation(value, typeHint);
        break;
      }
    /* falls through */
    case 'object':
      canonicalizedObj = canonicalizedObj || {};
      withStack(value, function () {
        Object.keys(value).sort().forEach(function (key) {
          canonicalizedObj[key] = exports.canonicalize(value[key], stack);
        });
      });
      break;
    case 'date':
    case 'number':
    case 'regexp':
    case 'boolean':
    case 'symbol':
      canonicalizedObj = value;
      break;
    default:
      canonicalizedObj = value + '';
  }

  return canonicalizedObj;
};

/**
 * Lookup file names at the given `path`.
 *
 * @memberof Mocha.utils
 * @public
 * @api public
 * @param {string} filepath Base path to start searching from.
 * @param {string[]} extensions File extensions to look for.
 * @param {boolean} recursive Whether or not to recurse into subdirectories.
 * @return {string[]} An array of paths.
 */
exports.lookupFiles = function lookupFiles (filepath, extensions, recursive) {
  var files = [];

  if (!fs.existsSync(filepath)) {
    if (fs.existsSync(filepath + '.js')) {
      filepath += '.js';
    } else {
      files = glob.sync(filepath);
      if (!files.length) {
        throw new Error("cannot resolve path (or pattern) '" + filepath + "'");
      }
      return files;
    }
  }

  try {
    var stat = fs.statSync(filepath);
    if (stat.isFile()) {
      return filepath;
    }
  } catch (err) {
    // ignore error
    return;
  }

  fs.readdirSync(filepath).forEach(function (file) {
    file = path.join(filepath, file);
    try {
      var stat = fs.statSync(file);
      if (stat.isDirectory()) {
        if (recursive) {
          files = files.concat(lookupFiles(file, extensions, recursive));
        }
        return;
      }
    } catch (err) {
      // ignore error
      return;
    }
    var re = new RegExp('\\.(?:' + extensions.join('|') + ')$');
    if (!stat.isFile() || !re.test(file) || path.basename(file)[0] === '.') {
      return;
    }
    files.push(file);
  });

  return files;
};

/**
 * Generate an undefined error with a message warning the user.
 *
 * @return {Error}
 */

exports.undefinedError = function () {
  return new Error('Caught undefined error, did you throw without specifying what?');
};

/**
 * Generate an undefined error if `err` is not defined.
 *
 * @param {Error} err
 * @return {Error}
 */

exports.getError = function (err) {
  return err || exports.undefinedError();
};

/**
 * @summary
 * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)
 * @description
 * When invoking this function you get a filter function that get the Error.stack as an input,
 * and return a prettify output.
 * (i.e: strip Mocha and internal node functions from stack trace).
 * @returns {Function}
 */
exports.stackTraceFilter = function () {
  // TODO: Replace with `process.browser`
  var is = typeof document === 'undefined' ? { node: true } : { browser: true };
  var slash = path.sep;
  var cwd;
  if (is.node) {
    cwd = process.cwd() + slash;
  } else {
    cwd = (typeof location === 'undefined'
      ? window.location
      : location).href.replace(/\/[^/]*$/, '/');
    slash = '/';
  }

  function isMochaInternal (line) {
    return (~line.indexOf('node_modules' + slash + 'mocha' + slash)) ||
      (~line.indexOf('node_modules' + slash + 'mocha.js')) ||
      (~line.indexOf('bower_components' + slash + 'mocha.js')) ||
      (~line.indexOf(slash + 'mocha.js'));
  }

  function isNodeInternal (line) {
    return (~line.indexOf('(timers.js:')) ||
      (~line.indexOf('(events.js:')) ||
      (~line.indexOf('(node.js:')) ||
      (~line.indexOf('(module.js:')) ||
      (~line.indexOf('GeneratorFunctionPrototype.next (native)')) ||
      false;
  }

  return function (stack) {
    stack = stack.split('\n');

    stack = stack.reduce(function (list, line) {
      if (isMochaInternal(line)) {
        return list;
      }

      if (is.node && isNodeInternal(line)) {
        return list;
      }

      // Clean up cwd(absolute)
      if (/\(?.+:\d+:\d+\)?$/.test(line)) {
        line = line.replace('(' + cwd, '(');
      }

      list.push(line);
      return list;
    }, []);

    return stack.join('\n');
  };
};

/**
 * Crude, but effective.
 * @api
 * @param {*} value
 * @returns {boolean} Whether or not `value` is a Promise
 */
exports.isPromise = function isPromise (value) {
  return typeof value === 'object' && typeof value.then === 'function';
};

/**
 * It's a noop.
 * @api
 */
exports.noop = function () {};
