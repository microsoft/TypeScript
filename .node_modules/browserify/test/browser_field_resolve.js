var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('browser field resolve (a)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/a/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.equal(x, 555) }
    });
});

test('browser field resolve (b)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/b/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.equal(x, 444) }
    });
});

test('browser field resolve (c)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/c/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.equal(x, 333) }
    });
    
});

test('browser field resolve (d)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/d/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.equal(x, 222) }
    });
});

test('browser field resolve (e)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/e/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.equal(x, 111) }
    });
});

test('browser field resolve (f)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/f/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.equal(x, 999) }
    });
});

test('browser field resolve (g)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/g/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.deepEqual(x, {}) }
    });
});

test('browser field resolve (h)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/h/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.deepEqual(x, {}) }
    });
});

test('browser field resolve (i)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/i/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.deepEqual(x, 5000) }
    });
});

test('browser field resolve (j)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/j/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.deepEqual(x, 5000) }
    });
});

test('browser field resolve (k)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/k/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.deepEqual(x, 3000) }
    });
});

test('browser field resolve (l)', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_resolve/l/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (x) { t.deepEqual(x, 3000) }
    });
});
