var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

function ensureTransform(t, buf) {
  var srcAsString = (buf||'').toString('utf-8'),
      containsAX = srcAsString.indexOf('AX') > -1,
      containsAZ = srcAsString.indexOf('AZ') > -1;
  t.notOk(containsAX,"should not contain AX's");
  t.ok(containsAZ,"should contain AZ's");
}

test('absolute paths with transform property', function (t) {
  t.plan(6);

  var b = browserify({
    transform: ['tr'],
    basedir: __dirname,
    paths: [ __dirname + '/paths/x', __dirname + '/paths/y' ],
    entries: __dirname + '/paths/main.js'
  });
  b.bundle(function (err, src) {
    t.ifError(err);
    ensureTransform(t,src);
    vm.runInNewContext(src, { t: t });
  });
});

test('relative paths with transform property', function (t) {
  t.plan(6);

  var b = browserify({
    transform: ['tr'],
    basedir: __dirname,
    paths: [ './paths/x', './paths/y' ],
    entries: __dirname + '/paths/main.js'
  });
  b.bundle(function (err, src) {
    t.ifError(err);
    ensureTransform(t,src);
    vm.runInNewContext(src, { t: t });
  });
});


test('absolute paths with transform method', function (t) {
  t.plan(6);

  var b = browserify({
    basedir: __dirname,
    paths: [ __dirname + '/paths/x', __dirname + '/paths/y' ],
    entries: __dirname + '/paths/main.js'
  });
  b.transform('tr');
  b.bundle(function (err, src) {
    t.ifError(err);
    ensureTransform(t,src);
    vm.runInNewContext(src, { t: t });
  });
});


test('relative paths with transform method', function (t) {
  t.plan(6);
  var b = browserify({
    basedir: __dirname,
    paths: ['./paths/x', './paths/y' ],
    entries: __dirname + '/paths/main.js'
  });
  b.transform('tr');
  b.bundle(function (err, src) {
    t.ifError(err);
    ensureTransform(t,src);
    vm.runInNewContext(src, { t: t });
  });
});
