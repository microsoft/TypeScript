var assert = require('assert')
  , h = require('./helpers');

var tests = {

  'before': function () {
    process.chdir('./test');
  }

, 'after': function () {
    process.chdir('../');
  }
, 'test selfdepconst': function (next) {
    h.exec('../bin/cli.js selfdepconst', {breakOnError:false}, function (out) {
      assert.equal(1, out.code);
      next();
    });
  }
, 'test selfdepdyn': function (next) {
    h.exec('../bin/cli.js selfdepdyn', {breakOnError:false}, function (out) {
      assert.equal(1, out.code);
      next();
    });
  }
}
module.exports = tests;

