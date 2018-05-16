var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

if (!ArrayBuffer.isView) ArrayBuffer.isView = function () { return false; };

test('global', function (t) {
    t.plan(2);
    
    var b = browserify();
    b.add(__dirname + '/global/main.js');
    b.bundle(function (err, src) {
        var c = {
            t : t,
            a : 555,
        };
        c.self = c;
        vm.runInNewContext(src, c);
    });
});

test('__filename and __dirname with insertGlobals: true', function (t) {
    t.plan(2);

    var b = browserify({
        insertGlobals: true,
        basedir: __dirname + '/global'
    });
    b.require(__dirname + '/global/filename.js', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = { Uint8Array: Uint8Array };
        c.self = c;
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, '/filename.js');
        t.equal(x.dirname, '/');
    });
});

test('__filename and __dirname', function (t) {
    t.plan(2);
    
    var b = browserify({ basedir: __dirname + '/global' });
    b.require(__dirname + '/global/filename.js', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, '/filename.js');
        t.equal(x.dirname, '/');
    });
});

test('__filename and __dirname with basedir', function (t) {
    t.plan(2);
    
    var b = browserify({ basedir: __dirname });
    b.require(__dirname + '/global/filename.js', { expose: 'x' });
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, '/global/filename.js');
        t.equal(x.dirname, '/global');
    });
});

test('process.nextTick', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.add(__dirname + '/global/tick.js');
    b.bundle(function (err, src) {
        var c = { t: t, setTimeout: setTimeout, clearTimeout: clearTimeout };
        vm.runInNewContext(src, c);
    });
});

test('Buffer', function (t) {
    t.plan(2);
    
    var b = browserify();
    b.add(__dirname + '/global/buffer.js');
    b.bundle(function (err, src) {
        var c = {
            t: t,
            Uint8Array: Uint8Array,
            ArrayBuffer: ArrayBuffer
        };
        vm.runInNewContext(src, c);
    });
});
