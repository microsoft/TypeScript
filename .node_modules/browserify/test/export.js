var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('no exports when no files are loaded', function (t) {
    t.plan(1);
    var b = browserify();
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        t.same(Object.keys(c), []);
    });
});

test('no exports when entries are defined', function (t) {
    t.plan(1);
    var b = browserify();
    b.add(__dirname + '/export/entry.js');
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        t.same(c, {});
    });
});

test('require export when files are required', function (t) {
    t.plan(1);
    var b = browserify();
    b.require(__dirname + '/export/entry.js');
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        t.same(Object.keys(c), [ 'require' ]);
    });
});
