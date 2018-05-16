var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');

test('require expose external module', function (t) {
    t.plan(2);
    
    var b = browserify({ basedir: __dirname });
    b.require('beep', { expose: 'bip' });
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { };
        vm.runInNewContext(src, c);
        t.equal(c.require('bip'), 'boop');
    })
});

test('renaming builtin', function (t) {
    t.plan(2);
    
    var b = browserify({ basedir: __dirname });
    b.require('os', { expose: 'bone' });
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { };
        vm.runInNewContext(src, c);
        t.equal(c.require('bone').platform(), 'browser');
    })
});

test('exposed modules do not leak across bundles', function (t) {
    var bundle1, bundle2;

    bundle1 = browserify();
    bundle1.add(__dirname + '/require_expose/main.js');
    bundle1.require(__dirname + '/require_expose/some_dep.js', { expose: 'foo' });

    bundle1.bundle(function (err, src) {
        if (err) t.fail(err);

        var c = {};
        vm.runInNewContext(src, c);
        t.equal(c.foo, 'some_dep');

        bundle2 = browserify();
        bundle2.add(__dirname + '/require_expose/main.js');

        bundle2.bundle(function (err) {
            t.ok(err && err.message.match(/Cannot find module 'foo'/), 'should fail with missing module');
            t.end();
        });
    });
});
