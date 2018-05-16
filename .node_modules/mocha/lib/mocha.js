'use strict';

/*!
 * mocha
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */
/**
 * @namespace Mocha
 * @module Mocha
 */
/**
 * Module dependencies.
 */

var escapeRe = require('escape-string-regexp');
var path = require('path');
var reporters = require('./reporters');
var utils = require('./utils');

/**
 * Expose `Mocha`.
 */

exports = module.exports = Mocha;

/**
 * To require local UIs and reporters when running in node.
 */

if (!process.browser) {
  var cwd = process.cwd();
  module.paths.push(cwd, path.join(cwd, 'node_modules'));
}

/**
 * Expose internals.
 */

/**
 * @public
 * @class utils
 * @memberof Mocha
 */
exports.utils = utils;
exports.interfaces = require('./interfaces');
/**
 *
 * @memberof Mocha
 * @public
 */
exports.reporters = reporters;
exports.Runnable = require('./runnable');
exports.Context = require('./context');
/**
 *
 * @memberof Mocha
 */
exports.Runner = require('./runner');
exports.Suite = require('./suite');
exports.Hook = require('./hook');
exports.Test = require('./test');

/**
 * Return image `name` path.
 *
 * @api private
 * @param {string} name
 * @return {string}
 */
function image (name) {
  return path.join(__dirname, '../images', name + '.png');
}

/**
 * Set up mocha with `options`.
 *
 * Options:
 *
 *   - `ui` name "bdd", "tdd", "exports" etc
 *   - `reporter` reporter instance, defaults to `mocha.reporters.spec`
 *   - `globals` array of accepted globals
 *   - `timeout` timeout in milliseconds
 *   - `retries` number of times to retry failed tests
 *   - `bail` bail on the first test failure
 *   - `slow` milliseconds to wait before considering a test slow
 *   - `ignoreLeaks` ignore global leaks
 *   - `fullTrace` display the full stack-trace on failing
 *   - `grep` string or regexp to filter tests with
 *
 * @public
 * @class Mocha
 * @param {Object} options
 * @api public
 */
function Mocha (options) {
  options = options || {};
  this.files = [];
  this.options = options;
  if (options.grep) {
    this.grep(new RegExp(options.grep));
  }
  if (options.fgrep) {
    this.fgrep(options.fgrep);
  }
  this.suite = new exports.Suite('', new exports.Context());
  this.ui(options.ui);
  this.bail(options.bail);
  this.reporter(options.reporter, options.reporterOptions);
  if (typeof options.timeout !== 'undefined' && options.timeout !== null) {
    this.timeout(options.timeout);
  }
  if (typeof options.retries !== 'undefined' && options.retries !== null) {
    this.retries(options.retries);
  }
  this.useColors(options.useColors);
  if (options.enableTimeouts !== null) {
    this.enableTimeouts(options.enableTimeouts);
  }
  if (options.slow) {
    this.slow(options.slow);
  }
}

/**
 * Enable or disable bailing on the first failure.
 *
 * @public
 * @api public
 * @param {boolean} [bail]
 */
Mocha.prototype.bail = function (bail) {
  if (!arguments.length) {
    bail = true;
  }
  this.suite.bail(bail);
  return this;
};

/**
 * Add test `file`.
 *
 * @public
 * @api public
 * @param {string} file
 */
Mocha.prototype.addFile = function (file) {
  this.files.push(file);
  return this;
};

/**
 * Set reporter to `reporter`, defaults to "spec".
 *
 * @public
 * @param {String|Function} reporter name or constructor
 * @param {Object} reporterOptions optional options
 * @api public
 * @param {string|Function} reporter name or constructor
 * @param {Object} reporterOptions optional options
 */
Mocha.prototype.reporter = function (reporter, reporterOptions) {
  if (typeof reporter === 'function') {
    this._reporter = reporter;
  } else {
    reporter = reporter || 'spec';
    var _reporter;
    // Try to load a built-in reporter.
    if (reporters[reporter]) {
      _reporter = reporters[reporter];
    }
    // Try to load reporters from process.cwd() and node_modules
    if (!_reporter) {
      try {
        _reporter = require(reporter);
      } catch (err) {
        if (err.message.indexOf('Cannot find module') !== -1) {
          // Try to load reporters from a path (absolute or relative)
          try {
            _reporter = require(path.resolve(process.cwd(), reporter));
          } catch (_err) {
            err.message.indexOf('Cannot find module') !== -1 ? console.warn('"' + reporter + '" reporter not found')
              : console.warn('"' + reporter + '" reporter blew up with error:\n' + err.stack);
          }
        } else {
          console.warn('"' + reporter + '" reporter blew up with error:\n' + err.stack);
        }
      }
    }
    if (!_reporter && reporter === 'teamcity') {
      console.warn('The Teamcity reporter was moved to a package named ' +
        'mocha-teamcity-reporter ' +
        '(https://npmjs.org/package/mocha-teamcity-reporter).');
    }
    if (!_reporter) {
      throw new Error('invalid reporter "' + reporter + '"');
    }
    this._reporter = _reporter;
  }
  this.options.reporterOptions = reporterOptions;
  return this;
};

/**
 * Set test UI `name`, defaults to "bdd".
 * @public
 * @api public
 * @param {string} bdd
 */
Mocha.prototype.ui = function (name) {
  name = name || 'bdd';
  this._ui = exports.interfaces[name];
  if (!this._ui) {
    try {
      this._ui = require(name);
    } catch (err) {
      throw new Error('invalid interface "' + name + '"');
    }
  }
  this._ui = this._ui(this.suite);

  this.suite.on('pre-require', function (context) {
    exports.afterEach = context.afterEach || context.teardown;
    exports.after = context.after || context.suiteTeardown;
    exports.beforeEach = context.beforeEach || context.setup;
    exports.before = context.before || context.suiteSetup;
    exports.describe = context.describe || context.suite;
    exports.it = context.it || context.test;
    exports.xit = context.xit || context.test.skip;
    exports.setup = context.setup || context.beforeEach;
    exports.suiteSetup = context.suiteSetup || context.before;
    exports.suiteTeardown = context.suiteTeardown || context.after;
    exports.suite = context.suite || context.describe;
    exports.teardown = context.teardown || context.afterEach;
    exports.test = context.test || context.it;
    exports.run = context.run;
  });

  return this;
};

/**
 * Load registered files.
 *
 * @api private
 */
Mocha.prototype.loadFiles = function (fn) {
  var self = this;
  var suite = this.suite;
  this.files.forEach(function (file) {
    file = path.resolve(file);
    suite.emit('pre-require', global, file, self);
    suite.emit('require', require(file), file, self);
    suite.emit('post-require', global, file, self);
  });
  fn && fn();
};

/**
 * Enable growl support.
 *
 * @api private
 */
Mocha.prototype._growl = function (runner, reporter) {
  var notify = require('growl');

  runner.on('end', function () {
    var stats = reporter.stats;
    if (stats.failures) {
      var msg = stats.failures + ' of ' + runner.total + ' tests failed';
      notify(msg, { name: 'mocha', title: 'Failed', image: image('error') });
    } else {
      notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {
        name: 'mocha',
        title: 'Passed',
        image: image('ok')
      });
    }
  });
};

/**
 * Escape string and add it to grep as a regexp.
 *
 * @public
 * @api public
 * @param str
 * @returns {Mocha}
 */
Mocha.prototype.fgrep = function (str) {
  return this.grep(new RegExp(escapeRe(str)));
};

/**
 * Add regexp to grep, if `re` is a string it is escaped.
 *
 * @public
 * @param {RegExp|String} re
 * @return {Mocha}
 * @api public
 * @param {RegExp|string} re
 * @return {Mocha}
 */
Mocha.prototype.grep = function (re) {
  if (utils.isString(re)) {
    // extract args if it's regex-like, i.e: [string, pattern, flag]
    var arg = re.match(/^\/(.*)\/(g|i|)$|.*/);
    this.options.grep = new RegExp(arg[1] || arg[0], arg[2]);
  } else {
    this.options.grep = re;
  }
  return this;
};
/**
 * Invert `.grep()` matches.
 *
 * @public
 * @return {Mocha}
 * @api public
 */
Mocha.prototype.invert = function () {
  this.options.invert = true;
  return this;
};

/**
 * Ignore global leaks.
 *
 * @public
 * @param {Boolean} ignore
 * @return {Mocha}
 * @api public
 * @param {boolean} ignore
 * @return {Mocha}
 */
Mocha.prototype.ignoreLeaks = function (ignore) {
  this.options.ignoreLeaks = Boolean(ignore);
  return this;
};

/**
 * Enable global leak checking.
 *
 * @return {Mocha}
 * @api public
 * @public
 */
Mocha.prototype.checkLeaks = function () {
  this.options.ignoreLeaks = false;
  return this;
};

/**
 * Display long stack-trace on failing
 *
 * @return {Mocha}
 * @api public
 * @public
 */
Mocha.prototype.fullTrace = function () {
  this.options.fullStackTrace = true;
  return this;
};

/**
 * Enable growl support.
 *
 * @return {Mocha}
 * @api public
 * @public
 */
Mocha.prototype.growl = function () {
  this.options.growl = true;
  return this;
};

/**
 * Ignore `globals` array or string.
 *
 * @param {Array|String} globals
 * @return {Mocha}
 * @api public
 * @public
 * @param {Array|string} globals
 * @return {Mocha}
 */
Mocha.prototype.globals = function (globals) {
  this.options.globals = (this.options.globals || []).concat(globals);
  return this;
};

/**
 * Emit color output.
 *
 * @param {Boolean} colors
 * @return {Mocha}
 * @api public
 * @public
 * @param {boolean} colors
 * @return {Mocha}
 */
Mocha.prototype.useColors = function (colors) {
  if (colors !== undefined) {
    this.options.useColors = colors;
  }
  return this;
};

/**
 * Use inline diffs rather than +/-.
 *
 * @param {Boolean} inlineDiffs
 * @return {Mocha}
 * @api public
 * @public
 * @param {boolean} inlineDiffs
 * @return {Mocha}
 */
Mocha.prototype.useInlineDiffs = function (inlineDiffs) {
  this.options.useInlineDiffs = inlineDiffs !== undefined && inlineDiffs;
  return this;
};

/**
 * Do not show diffs at all.
 *
 * @param {Boolean} hideDiff
 * @return {Mocha}
 * @api public
 * @public
 * @param {boolean} hideDiff
 * @return {Mocha}
 */
Mocha.prototype.hideDiff = function (hideDiff) {
  this.options.hideDiff = hideDiff !== undefined && hideDiff;
  return this;
};

/**
 * Set the timeout in milliseconds.
 *
 * @param {Number} timeout
 * @return {Mocha}
 * @api public
 * @public
 * @param {number} timeout
 * @return {Mocha}
 */
Mocha.prototype.timeout = function (timeout) {
  this.suite.timeout(timeout);
  return this;
};

/**
 * Set the number of times to retry failed tests.
 *
 * @param {Number} retry times
 * @return {Mocha}
 * @api public
 * @public
 */
Mocha.prototype.retries = function (n) {
  this.suite.retries(n);
  return this;
};

/**
 * Set slowness threshold in milliseconds.
 *
 * @param {Number} slow
 * @return {Mocha}
 * @api public
 * @public
 * @param {number} slow
 * @return {Mocha}
 */
Mocha.prototype.slow = function (slow) {
  this.suite.slow(slow);
  return this;
};

/**
 * Enable timeouts.
 *
 * @param {Boolean} enabled
 * @return {Mocha}
 * @api public
 * @public
 * @param {boolean} enabled
 * @return {Mocha}
 */
Mocha.prototype.enableTimeouts = function (enabled) {
  this.suite.enableTimeouts(arguments.length && enabled !== undefined ? enabled : true);
  return this;
};

/**
 * Makes all tests async (accepting a callback)
 *
 * @return {Mocha}
 * @api public
 * @public
 */
Mocha.prototype.asyncOnly = function () {
  this.options.asyncOnly = true;
  return this;
};

/**
 * Disable syntax highlighting (in browser).
 *
 * @api public
 * @public
 */
Mocha.prototype.noHighlighting = function () {
  this.options.noHighlighting = true;
  return this;
};

/**
 * Enable uncaught errors to propagate (in browser).
 *
 * @return {Mocha}
 * @api public
 * @public
 */
Mocha.prototype.allowUncaught = function () {
  this.options.allowUncaught = true;
  return this;
};

/**
 * Delay root suite execution.
 * @returns {Mocha}
 */
Mocha.prototype.delay = function delay () {
  this.options.delay = true;
  return this;
};

/**
 * Tests marked only fail the suite
 * @returns {Mocha}
 */
Mocha.prototype.forbidOnly = function () {
  this.options.forbidOnly = true;
  return this;
};

/**
 * Pending tests and tests marked skip fail the suite
 * @returns {Mocha}
 */
Mocha.prototype.forbidPending = function () {
  this.options.forbidPending = true;
  return this;
};

/**
 * Run tests and invoke `fn()` when complete.
 *
 * Note that `loadFiles` relies on Node's `require` to execute
 * the test interface functions and will be subject to the
 * cache - if the files are already in the `require` cache,
 * they will effectively be skipped. Therefore, to run tests
 * multiple times or to run tests in files that are already
 * in the `require` cache, make sure to clear them from the
 * cache first in whichever manner best suits your needs.
 *
 * @api public
 * @public
 * @param {Function} fn
 * @return {Runner}
 */
Mocha.prototype.run = function (fn) {
  if (this.files.length) {
    this.loadFiles();
  }
  var suite = this.suite;
  var options = this.options;
  options.files = this.files;
  var runner = new exports.Runner(suite, options.delay);
  var reporter = new this._reporter(runner, options);
  runner.ignoreLeaks = options.ignoreLeaks !== false;
  runner.fullStackTrace = options.fullStackTrace;
  runner.asyncOnly = options.asyncOnly;
  runner.allowUncaught = options.allowUncaught;
  runner.forbidOnly = options.forbidOnly;
  runner.forbidPending = options.forbidPending;
  if (options.grep) {
    runner.grep(options.grep, options.invert);
  }
  if (options.globals) {
    runner.globals(options.globals);
  }
  if (options.growl) {
    this._growl(runner, reporter);
  }
  if (options.useColors !== undefined) {
    exports.reporters.Base.useColors = options.useColors;
  }
  exports.reporters.Base.inlineDiffs = options.useInlineDiffs;
  exports.reporters.Base.hideDiff = options.hideDiff;

  function done (failures) {
    if (reporter.done) {
      reporter.done(failures, fn);
    } else {
      fn && fn(failures);
    }
  }

  return runner.run(done);
};
