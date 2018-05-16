var test = require('tap').test;
var fromArgs = require('../bin/args.js');
var path = require('path');
var vm = require('vm');

test('bundle from an arguments array', function (t) {
    t.plan(2);
    
    var b = fromArgs([ __dirname + '/entry/two.js', '-s', 'XYZ' ]);
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { window: {} };
        vm.runInNewContext(src, c);
        t.equal(c.window.XYZ, 2);
    });
});

test('external flag for node modules', function(t) {
    t.plan(2);
    
    var b = fromArgs([ __dirname + '/external_args/main.js', '-x', 'backbone' ]);
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, {t: t});
    });
});

test('bundle from an arguments with --insert-global-vars', function (t) {
    t.plan(4);

    var b = fromArgs([
        __dirname + '/global/filename.js',
        '--insert-global-vars=__filename,__dirname',
        '--basedir', __dirname
    ]);
    b.require(__dirname + '/global/filename.js', { expose: 'x' });
    b.bundle(function (err, src) {
        t.ifError(err, 'b.bundle()');
        var c = {}, x;
        vm.runInNewContext(src, c);
        t.doesNotThrow(function() {
            x = c.require('x');
        }, 'x = c.require(\'x\')');
        t.equal(x && x.filename, '/global/filename.js', 'x.filename');
        t.equal(x && x.dirname, '/global', 'x.dirname');
    })
});

test('numeric module names', function(t) {
    t.plan(1);

    var b = fromArgs([ '-x', '1337' ]);
    b.bundle(function (err, src) {
        t.ifError(err);
    });
});

test('entry expose', function (t) {
    t.plan(3)
    
    var b = fromArgs([
        path.join(__dirname, '/entry_expose/main.js'),
        '--require', path.join(__dirname, '/entry_expose/main.js') + ':x',
    ]);
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { console: { log: log } };
        function log (msg) { t.equal(msg, 'wow') }
        vm.runInNewContext(src, c);
        t.equal(c.require('x'), 555);
    })
});
