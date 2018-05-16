var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');

test('ignore transform', function(t) {
  t.plan(1);

  var b = browserify({
    transformKey: false
  });
  b.add(__dirname + '/ignore_transform_key/main.js');

  b.bundle(function(err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, {t: t});
  });
});
