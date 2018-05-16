'use strict';

/**
 * @module Runner
 */
/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var Pending = require('./pending');
var utils = require('./utils');
var inherits = utils.inherits;
var debug = require('debug')('mocha:runner');
var Runnable = require('./runnable');
var stackFilter = utils.stackTraceFilter();
var stringify = utils.stringify;
var type = utils.type;
var undefinedError = utils.undefinedError;

/**
 * Non-enumerable globals.
 */

var globals = [
  'setTimeout',
  'clearTimeout',
  'setInterval',
  'clearInterval',
  'XMLHttpRequest',
  'Date',
  'setImmediate',
  'clearImmediate'
];

/**
 * Expose `Runner`.
 */

module.exports = Runner;

/**
 * Initialize a `Runner` for the given `suite`. Derived from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
 *
 * Events:
 *
 *   - `start`  execution started
 *   - `end`  execution complete
 *   - `suite`  (suite) test suite execution started
 *   - `suite end`  (suite) all tests (and sub-suites) have finished
 *   - `test`  (test) test execution started
 *   - `test end`  (test) test completed
 *   - `hook`  (hook) hook execution started
 *   - `hook end`  (hook) hook complete
 *   - `pass`  (test) test passed
 *   - `fail`  (test, err) test failed
 *   - `pending`  (test) test pending
 *
 * @memberof Mocha
 * @public
 * @class
 * @api public
 * @param {Suite} [suite] Root suite
 * @param {boolean} [delay] Whether or not to delay execution of root suite
 * until ready.
 */
function Runner (suite, delay) {
  var self = this;
  this._globals = [];
  this._abort = false;
  this._delay = delay;
  this.suite = suite;
  this.started = false;
  this.total = suite.total();
  this.failures = 0;
  this.on('test end', function (test) {
    self.checkGlobals(test);
  });
  this.on('hook end', function (hook) {
    self.checkGlobals(hook);
  });
  this._defaultGrep = /.*/;
  this.grep(this._defaultGrep);
  this.globals(this.globalProps().concat(extraGlobals()));
}

/**
 * Wrapper for setImmediate, process.nextTick, or browser polyfill.
 *
 * @param {Function} fn
 * @api private
 */
Runner.immediately = global.setImmediate || process.nextTick;

/**
 * Inherit from `EventEmitter.prototype`.
 */
inherits(Runner, EventEmitter);

/**
 * Run tests with full titles matching `re`. Updates runner.total
 * with number of tests matched.
 *
 * @api public
 * @public
 * @memberof Mocha.Runner
 * @param {RegExp} re
 * @param {boolean} invert
 * @return {Runner} Runner instance.
 */
Runner.prototype.grep = function (re, invert) {
  debug('grep %s', re);
  this._grep = re;
  this._invert = invert;
  this.total = this.grepTotal(this.suite);
  return this;
};

/**
 * Returns the number of tests matching the grep search for the
 * given suite.
 *
 * @memberof Mocha.Runner
 * @api public
 * @public
 * @param {Suite} suite
 * @return {number}
 */
Runner.prototype.grepTotal = function (suite) {
  var self = this;
  var total = 0;

  suite.eachTest(function (test) {
    var match = self._grep.test(test.fullTitle());
    if (self._invert) {
      match = !match;
    }
    if (match) {
      total++;
    }
  });

  return total;
};

/**
 * Return a list of global properties.
 *
 * @return {Array}
 * @api private
 */
Runner.prototype.globalProps = function () {
  var props = Object.keys(global);

  // non-enumerables
  for (var i = 0; i < globals.length; ++i) {
    if (~props.indexOf(globals[i])) {
      continue;
    }
    props.push(globals[i]);
  }

  return props;
};

/**
 * Allow the given `arr` of globals.
 *
 * @api public
 * @public
 * @memberof Mocha.Runner
 * @param {Array} arr
 * @return {Runner} Runner instance.
 */
Runner.prototype.globals = function (arr) {
  if (!arguments.length) {
    return this._globals;
  }
  debug('globals %j', arr);
  this._globals = this._globals.concat(arr);
  return this;
};

/**
 * Check for global variable leaks.
 *
 * @api private
 */
Runner.prototype.checkGlobals = function (test) {
  if (this.ignoreLeaks) {
    return;
  }
  var ok = this._globals;

  var globals = this.globalProps();
  var leaks;

  if (test) {
    ok = ok.concat(test._allowedGlobals || []);
  }

  if (this.prevGlobalsLength === globals.length) {
    return;
  }
  this.prevGlobalsLength = globals.length;

  leaks = filterLeaks(ok, globals);
  this._globals = this._globals.concat(leaks);

  if (leaks.length > 1) {
    this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));
  } else if (leaks.length) {
    this.fail(test, new Error('global leak detected: ' + leaks[0]));
  }
};

/**
 * Fail the given `test`.
 *
 * @api private
 * @param {Test} test
 * @param {Error} err
 */
Runner.prototype.fail = function (test, err) {
  if (test.isPending()) {
    return;
  }

  ++this.failures;
  test.state = 'failed';

  if (!(err instanceof Error || (err && typeof err.message === 'string'))) {
    err = new Error('the ' + type(err) + ' ' + stringify(err) + ' was thrown, throw an Error :)');
  }

  try {
    err.stack = (this.fullStackTrace || !err.stack)
      ? err.stack
      : stackFilter(err.stack);
  } catch (ignored) {
    // some environments do not take kindly to monkeying with the stack
  }

  this.emit('fail', test, err);
};

/**
 * Fail the given `hook` with `err`.
 *
 * Hook failures work in the following pattern:
 * - If bail, then exit
 * - Failed `before` hook skips all tests in a suite and subsuites,
 *   but jumps to corresponding `after` hook
 * - Failed `before each` hook skips remaining tests in a
 *   suite and jumps to corresponding `after each` hook,
 *   which is run only once
 * - Failed `after` hook does not alter
 *   execution order
 * - Failed `after each` hook skips remaining tests in a
 *   suite and subsuites, but executes other `after each`
 *   hooks
 *
 * @api private
 * @param {Hook} hook
 * @param {Error} err
 */
Runner.prototype.failHook = function (hook, err) {
  if (hook.ctx && hook.ctx.currentTest) {
    hook.originalTitle = hook.originalTitle || hook.title;
    hook.title = hook.originalTitle + ' for "' + hook.ctx.currentTest.title + '"';
  }

  if (this.suite.bail()) {
    this.emit('end');
  }
  this.fail(hook, err);
};

/**
 * Run hook `name` callbacks and then invoke `fn()`.
 *
 * @api private
 * @param {string} name
 * @param {Function} fn
 */

Runner.prototype.hook = function (name, fn) {
  var suite = this.suite;
  var hooks = suite['_' + name];
  var self = this;

  function next (i) {
    var hook = hooks[i];
    if (!hook) {
      return fn();
    }
    self.currentRunnable = hook;

    hook.ctx.currentTest = self.test;

    self.emit('hook', hook);

    if (!hook.listeners('error').length) {
      hook.on('error', function (err) {
        self.failHook(hook, err);
      });
    }

    hook.run(function (err) {
      var testError = hook.error();
      if (testError) {
        self.fail(self.test, testError);
      }
      if (err) {
        if (err instanceof Pending) {
          if (name === 'beforeEach' || name === 'afterEach') {
            self.test.pending = true;
          } else {
            suite.tests.forEach(function (test) {
              test.pending = true;
            });
            // a pending hook won't be executed twice.
            hook.pending = true;
          }
        } else {
          self.failHook(hook, err);

          // stop executing hooks, notify callee of hook err
          return fn(err);
        }
      }
      self.emit('hook end', hook);
      delete hook.ctx.currentTest;
      next(++i);
    });
  }

  Runner.immediately(function () {
    next(0);
  });
};

/**
 * Run hook `name` for the given array of `suites`
 * in order, and callback `fn(err, errSuite)`.
 *
 * @api private
 * @param {string} name
 * @param {Array} suites
 * @param {Function} fn
 */
Runner.prototype.hooks = function (name, suites, fn) {
  var self = this;
  var orig = this.suite;

  function next (suite) {
    self.suite = suite;

    if (!suite) {
      self.suite = orig;
      return fn();
    }

    self.hook(name, function (err) {
      if (err) {
        var errSuite = self.suite;
        self.suite = orig;
        return fn(err, errSuite);
      }

      next(suites.pop());
    });
  }

  next(suites.pop());
};

/**
 * Run hooks from the top level down.
 *
 * @param {String} name
 * @param {Function} fn
 * @api private
 */
Runner.prototype.hookUp = function (name, fn) {
  var suites = [this.suite].concat(this.parents()).reverse();
  this.hooks(name, suites, fn);
};

/**
 * Run hooks from the bottom up.
 *
 * @param {String} name
 * @param {Function} fn
 * @api private
 */
Runner.prototype.hookDown = function (name, fn) {
  var suites = [this.suite].concat(this.parents());
  this.hooks(name, suites, fn);
};

/**
 * Return an array of parent Suites from
 * closest to furthest.
 *
 * @return {Array}
 * @api private
 */
Runner.prototype.parents = function () {
  var suite = this.suite;
  var suites = [];
  while (suite.parent) {
    suite = suite.parent;
    suites.push(suite);
  }
  return suites;
};

/**
 * Run the current test and callback `fn(err)`.
 *
 * @param {Function} fn
 * @api private
 */
Runner.prototype.runTest = function (fn) {
  var self = this;
  var test = this.test;

  if (!test) {
    return;
  }
  if (this.forbidOnly && hasOnly(this.parents().reverse()[0] || this.suite)) {
    fn(new Error('`.only` forbidden'));
    return;
  }
  if (this.asyncOnly) {
    test.asyncOnly = true;
  }
  test.on('error', function (err) {
    self.fail(test, err);
  });
  if (this.allowUncaught) {
    test.allowUncaught = true;
    return test.run(fn);
  }
  try {
    test.run(fn);
  } catch (err) {
    fn(err);
  }
};

/**
 * Run tests in the given `suite` and invoke the callback `fn()` when complete.
 *
 * @api private
 * @param {Suite} suite
 * @param {Function} fn
 */
Runner.prototype.runTests = function (suite, fn) {
  var self = this;
  var tests = suite.tests.slice();
  var test;

  function hookErr (_, errSuite, after) {
    // before/after Each hook for errSuite failed:
    var orig = self.suite;

    // for failed 'after each' hook start from errSuite parent,
    // otherwise start from errSuite itself
    self.suite = after ? errSuite.parent : errSuite;

    if (self.suite) {
      // call hookUp afterEach
      self.hookUp('afterEach', function (err2, errSuite2) {
        self.suite = orig;
        // some hooks may fail even now
        if (err2) {
          return hookErr(err2, errSuite2, true);
        }
        // report error suite
        fn(errSuite);
      });
    } else {
      // there is no need calling other 'after each' hooks
      self.suite = orig;
      fn(errSuite);
    }
  }

  function next (err, errSuite) {
    // if we bail after first err
    if (self.failures && suite._bail) {
      return fn();
    }

    if (self._abort) {
      return fn();
    }

    if (err) {
      return hookErr(err, errSuite, true);
    }

    // next test
    test = tests.shift();

    // all done
    if (!test) {
      return fn();
    }

    // grep
    var match = self._grep.test(test.fullTitle());
    if (self._invert) {
      match = !match;
    }
    if (!match) {
      // Run immediately only if we have defined a grep. When we
      // define a grep — It can cause maximum callstack error if
      // the grep is doing a large recursive loop by neglecting
      // all tests. The run immediately function also comes with
      // a performance cost. So we don't want to run immediately
      // if we run the whole test suite, because running the whole
      // test suite don't do any immediate recursive loops. Thus,
      // allowing a JS runtime to breathe.
      if (self._grep !== self._defaultGrep) {
        Runner.immediately(next);
      } else {
        next();
      }
      return;
    }

    if (test.isPending()) {
      if (self.forbidPending) {
        test.isPending = alwaysFalse;
        self.fail(test, new Error('Pending test forbidden'));
        delete test.isPending;
      } else {
        self.emit('pending', test);
      }
      self.emit('test end', test);
      return next();
    }

    // execute test and hook(s)
    self.emit('test', self.test = test);
    self.hookDown('beforeEach', function (err, errSuite) {
      if (test.isPending()) {
        if (self.forbidPending) {
          test.isPending = alwaysFalse;
          self.fail(test, new Error('Pending test forbidden'));
          delete test.isPending;
        } else {
          self.emit('pending', test);
        }
        self.emit('test end', test);
        return next();
      }
      if (err) {
        return hookErr(err, errSuite, false);
      }
      self.currentRunnable = self.test;
      self.runTest(function (err) {
        test = self.test;
        if (err) {
          var retry = test.currentRetry();
          if (err instanceof Pending && self.forbidPending) {
            self.fail(test, new Error('Pending test forbidden'));
          } else if (err instanceof Pending) {
            test.pending = true;
            self.emit('pending', test);
          } else if (retry < test.retries()) {
            var clonedTest = test.clone();
            clonedTest.currentRetry(retry + 1);
            tests.unshift(clonedTest);

            // Early return + hook trigger so that it doesn't
            // increment the count wrong
            return self.hookUp('afterEach', next);
          } else {
            self.fail(test, err);
          }
          self.emit('test end', test);

          if (err instanceof Pending) {
            return next();
          }

          return self.hookUp('afterEach', next);
        }

        test.state = 'passed';
        self.emit('pass', test);
        self.emit('test end', test);
        self.hookUp('afterEach', next);
      });
    });
  }

  this.next = next;
  this.hookErr = hookErr;
  next();
};

function alwaysFalse () {
  return false;
}

/**
 * Run the given `suite` and invoke the callback `fn()` when complete.
 *
 * @api private
 * @param {Suite} suite
 * @param {Function} fn
 */
Runner.prototype.runSuite = function (suite, fn) {
  var i = 0;
  var self = this;
  var total = this.grepTotal(suite);
  var afterAllHookCalled = false;

  debug('run suite %s', suite.fullTitle());

  if (!total || (self.failures && suite._bail)) {
    return fn();
  }

  this.emit('suite', this.suite = suite);

  function next (errSuite) {
    if (errSuite) {
      // current suite failed on a hook from errSuite
      if (errSuite === suite) {
        // if errSuite is current suite
        // continue to the next sibling suite
        return done();
      }
      // errSuite is among the parents of current suite
      // stop execution of errSuite and all sub-suites
      return done(errSuite);
    }

    if (self._abort) {
      return done();
    }

    var curr = suite.suites[i++];
    if (!curr) {
      return done();
    }

    // Avoid grep neglecting large number of tests causing a
    // huge recursive loop and thus a maximum call stack error.
    // See comment in `this.runTests()` for more information.
    if (self._grep !== self._defaultGrep) {
      Runner.immediately(function () {
        self.runSuite(curr, next);
      });
    } else {
      self.runSuite(curr, next);
    }
  }

  function done (errSuite) {
    self.suite = suite;
    self.nextSuite = next;

    if (afterAllHookCalled) {
      fn(errSuite);
    } else {
      // mark that the afterAll block has been called once
      // and so can be skipped if there is an error in it.
      afterAllHookCalled = true;

      // remove reference to test
      delete self.test;

      self.hook('afterAll', function () {
        self.emit('suite end', suite);
        fn(errSuite);
      });
    }
  }

  this.nextSuite = next;

  this.hook('beforeAll', function (err) {
    if (err) {
      return done();
    }
    self.runTests(suite, next);
  });
};

/**
 * Handle uncaught exceptions.
 *
 * @param {Error} err
 * @api private
 */
Runner.prototype.uncaught = function (err) {
  if (err) {
    debug('uncaught exception %s', err === (function () {
      return this;
    }.call(err)) ? (err.message || err) : err);
  } else {
    debug('uncaught undefined exception');
    err = undefinedError();
  }
  err.uncaught = true;

  var runnable = this.currentRunnable;

  if (!runnable) {
    runnable = new Runnable('Uncaught error outside test suite');
    runnable.parent = this.suite;

    if (this.started) {
      this.fail(runnable, err);
    } else {
      // Can't recover from this failure
      this.emit('start');
      this.fail(runnable, err);
      this.emit('end');
    }

    return;
  }

  runnable.clearTimeout();

  // Ignore errors if already failed or pending
  // See #3226
  if (runnable.isFailed() || runnable.isPending()) {
    return;
  }
  // we cannot recover gracefully if a Runnable has already passed
  // then fails asynchronously
  var alreadyPassed = runnable.isPassed();
  // this will change the state to "failed" regardless of the current value
  this.fail(runnable, err);
  if (!alreadyPassed) {
    // recover from test
    if (runnable.type === 'test') {
      this.emit('test end', runnable);
      this.hookUp('afterEach', this.next);
      return;
    }

    // recover from hooks
    var errSuite = this.suite;
    // if hook failure is in afterEach block
    if (runnable.fullTitle().indexOf('after each') > -1) {
      return this.hookErr(err, errSuite, true);
    }
    // if hook failure is in beforeEach block
    if (runnable.fullTitle().indexOf('before each') > -1) {
      return this.hookErr(err, errSuite, false);
    }
    // if hook failure is in after or before blocks
    return this.nextSuite(errSuite);
  }

  // bail
  this.emit('end');
};

/**
 * Cleans up the references to all the deferred functions
 * (before/after/beforeEach/afterEach) and tests of a Suite.
 * These must be deleted otherwise a memory leak can happen,
 * as those functions may reference variables from closures,
 * thus those variables can never be garbage collected as long
 * as the deferred functions exist.
 *
 * @param {Suite} suite
 */
function cleanSuiteReferences (suite) {
  function cleanArrReferences (arr) {
    for (var i = 0; i < arr.length; i++) {
      delete arr[i].fn;
    }
  }

  if (Array.isArray(suite._beforeAll)) {
    cleanArrReferences(suite._beforeAll);
  }

  if (Array.isArray(suite._beforeEach)) {
    cleanArrReferences(suite._beforeEach);
  }

  if (Array.isArray(suite._afterAll)) {
    cleanArrReferences(suite._afterAll);
  }

  if (Array.isArray(suite._afterEach)) {
    cleanArrReferences(suite._afterEach);
  }

  for (var i = 0; i < suite.tests.length; i++) {
    delete suite.tests[i].fn;
  }
}

/**
 * Run the root suite and invoke `fn(failures)`
 * on completion.
 *
 * @api public
 * @public
 * @memberof Mocha.Runner
 * @param {Function} fn
 * @return {Runner} Runner instance.
 */
Runner.prototype.run = function (fn) {
  var self = this;
  var rootSuite = this.suite;

  fn = fn || function () {};

  function uncaught (err) {
    self.uncaught(err);
  }

  function start () {
    // If there is an `only` filter
    if (hasOnly(rootSuite)) {
      filterOnly(rootSuite);
    }
    self.started = true;
    self.emit('start');
    self.runSuite(rootSuite, function () {
      debug('finished running');
      self.emit('end');
    });
  }

  debug('start');

  // references cleanup to avoid memory leaks
  this.on('suite end', cleanSuiteReferences);

  // callback
  this.on('end', function () {
    debug('end');
    process.removeListener('uncaughtException', uncaught);
    fn(self.failures);
  });

  // uncaught exception
  process.on('uncaughtException', uncaught);

  if (this._delay) {
    // for reporters, I guess.
    // might be nice to debounce some dots while we wait.
    this.emit('waiting', rootSuite);
    rootSuite.once('run', start);
  } else {
    start();
  }

  return this;
};

/**
 * Cleanly abort execution.
 *
 * @memberof Mocha.Runner
 * @public
 * @api public
 * @return {Runner} Runner instance.
 */
Runner.prototype.abort = function () {
  debug('aborting');
  this._abort = true;

  return this;
};

/**
 * Filter suites based on `isOnly` logic.
 *
 * @param {Array} suite
 * @returns {Boolean}
 * @api private
 */
function filterOnly (suite) {
  if (suite._onlyTests.length) {
    // If the suite contains `only` tests, run those and ignore any nested suites.
    suite.tests = suite._onlyTests;
    suite.suites = [];
  } else {
    // Otherwise, do not run any of the tests in this suite.
    suite.tests = [];
    suite._onlySuites.forEach(function (onlySuite) {
      // If there are other `only` tests/suites nested in the current `only` suite, then filter that `only` suite.
      // Otherwise, all of the tests on this `only` suite should be run, so don't filter it.
      if (hasOnly(onlySuite)) {
        filterOnly(onlySuite);
      }
    });
    // Run the `only` suites, as well as any other suites that have `only` tests/suites as descendants.
    suite.suites = suite.suites.filter(function (childSuite) {
      return suite._onlySuites.indexOf(childSuite) !== -1 || filterOnly(childSuite);
    });
  }
  // Keep the suite only if there is something to run
  return suite.tests.length || suite.suites.length;
}

/**
 * Determines whether a suite has an `only` test or suite as a descendant.
 *
 * @param {Array} suite
 * @returns {Boolean}
 * @api private
 */
function hasOnly (suite) {
  return suite._onlyTests.length || suite._onlySuites.length || suite.suites.some(hasOnly);
}

/**
 * Filter leaks with the given globals flagged as `ok`.
 *
 * @api private
 * @param {Array} ok
 * @param {Array} globals
 * @return {Array}
 */
function filterLeaks (ok, globals) {
  return globals.filter(function (key) {
    // Firefox and Chrome exposes iframes as index inside the window object
    if (/^\d+/.test(key)) {
      return false;
    }

    // in firefox
    // if runner runs in an iframe, this iframe's window.getInterface method
    // not init at first it is assigned in some seconds
    if (global.navigator && (/^getInterface/).test(key)) {
      return false;
    }

    // an iframe could be approached by window[iframeIndex]
    // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak
    if (global.navigator && (/^\d+/).test(key)) {
      return false;
    }

    // Opera and IE expose global variables for HTML element IDs (issue #243)
    if (/^mocha-/.test(key)) {
      return false;
    }

    var matched = ok.filter(function (ok) {
      if (~ok.indexOf('*')) {
        return key.indexOf(ok.split('*')[0]) === 0;
      }
      return key === ok;
    });
    return !matched.length && (!global.navigator || key !== 'onerror');
  });
}

/**
 * Array of globals dependent on the environment.
 *
 * @return {Array}
 * @api private
 */
function extraGlobals () {
  if (typeof process === 'object' && typeof process.version === 'string') {
    var parts = process.version.split('.');
    var nodeVersion = parts.reduce(function (a, v) {
      return a << 8 | v;
    });

    // 'errno' was renamed to process._errno in v0.9.11.

    if (nodeVersion < 0x00090B) {
      return ['errno'];
    }
  }

  return [];
}
