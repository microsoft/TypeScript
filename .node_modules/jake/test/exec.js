var assert = require('assert')
  , h = require('./helpers')
  , utils = require('../lib/utils');

utils.mixin(utils, utils);

var tests = {
  'before': function () {
    process.chdir('./test');
  }

, 'after': function () {
    process.chdir('../');
  }

, 'test basic exec': function (next) {
    var ex = utils.createExec('ls', function () {})
      , evts = { // Events should fire in this order
          cmdStart: [0, null]
        , stdout: [1, null]
        , cmdEnd: [2, null]
        , end: [3, null]
        }
      , incr = 0; // Increment with each event to check order
    assert.ok(ex instanceof utils.Exec);

    var addListenerAndIncrement = function (p) {
      ex.addListener(p, function () {
        evts[p][1] = incr;
        incr++;
      });
    };

    // Make sure basic events fire and fire in the right order
    for (var p in evts) {
      addListenerAndIncrement(p);
    }
    ex.run();
    ex.addListener('end', function () {
      for (var p in evts) {
        assert.equal(evts[p][0], evts[p][1]);
      }
      next();
    });

  }

, 'test an exec failure': function (next) {
    var ex = utils.createExec('false', function () {});
    ex.addListener('error', function (msg, code) {
      assert.equal(1, code);
      next();
    });
    ex.run();
  }

, 'test exec stdout events': function (next) {
    var ex = utils.createExec('echo "foo"', function () {});
    ex.addListener('stdout', function (data) {
      assert.equal("foo", h.trim(data.toString()));
      next();
    });
    ex.run();
  }

, 'test exec stderr events': function (next) {
    var ex = utils.createExec('echo "foo" 1>&2', function () {});
    ex.addListener('stderr', function (data) {
      assert.equal("foo", h.trim(data.toString()));
      next();
    });
    ex.run();
  }

, 'test piping results into next command': function (next) {
    var ex = utils.createExec('ls', function () {})
      , data
      , appended = false;

    ex.addListener('stdout', function (d) {
      data += h.trim(d.toString());
    });

    // After the first command ends, get the accumulated result,
    // and use it to build a new command to append to the queue.
    // Grep through the result for files that end in .js
    ex.addListener('cmdEnd', function () {
      // Only append after the first cmd, avoid infinite loop
      if (appended) {
        return;
      }
      appended = true;
      // Take the original output and build the new command
      ex.append('echo "' + data + '" | grep "\\.js$"');
      // Clear out data
      data = '';
    });

    // And the end, the stdout data has been cleared once, and the new
    // data should be the result of the second command
    ex.addListener('end', function () {
      // Should be a list of files ending in .js
      data = data.split('\n');
      data.forEach(function (d) {
        assert.ok(/\.js$/.test(d));
      });
      next();
    });
    ex.run();
  }

};

module.exports = tests;

