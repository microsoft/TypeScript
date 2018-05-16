var assert = require('assert')
  , h = require('./helpers');

var tests = {

  'before': function () {
    process.chdir('./test');
  }

, 'after': function () {
    process.chdir('../');
  }

, 'test simple parallel prerequisites 1': function (next) {
    h.exec('../bin/cli.js parallel:simple1', function (out) {
      assert.equal('Started A\nStarted B\nFinished B\nFinished A', out);
      next();
    });
  }
, 'test simple parallel prerequisites 2': function (next) {
    h.exec('../bin/cli.js parallel:simple2', function (out) {
      assert.equal('Started C\nStarted D\nFinished C\nFinished D', out);
      next();
    });
  }
, 'test sequential parallel prerequisites': function (next) {
    h.exec('../bin/cli.js parallel:seqparallel', function (out) {
      assert.equal('Started A\nStarted B\nFinished B\nFinished A\nStarted C\nStarted D\nFinished C\nFinished D', out);
      next();
    });
  }
, 'test parallel parallel prerequisites': function (next) {
    h.exec('../bin/cli.js parallel:parallelparallel', function (out) {
      assert.equal('Started A\nStarted B\nStarted C\nStarted D\nFinished B\nFinished C\nFinished A\nFinished D', out);
      next();
    });
  }
, 'test parallel prerequisites with subdependency': function (next) {
    h.exec('../bin/cli.js parallel:subdep', function (out) {
      assert.equal('Started A\nFinished A\nStarted Ba\nFinished Ba', out);
      next();
    });
  }
, 'test failing in parallel prerequisites': function (next) {
    h.exec('../bin/cli.js parallel:Cfail', {breakOnError:false},function (out) {
      assert.equal(1, out.code);
      next();
    });
  }
}
module.exports = tests;

