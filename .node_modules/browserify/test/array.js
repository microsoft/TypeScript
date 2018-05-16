var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('array add', function (t) {
    var expected = [ 'ONE', 'TWO', 'THREE' ];
    t.plan(expected.length);
    
    var b = browserify();
    var files = [
        __dirname + '/array/one.js',
        __dirname + '/array/two.js',
        __dirname + '/array/three.js'
    ];
    b.add(files);
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { console: { log: log } });
        function log (msg) {
            t.equal(msg, expected.shift());
        }
    });
});

test('array require', function (t) {
    t.plan(3);
    
    var b = browserify();
    var files = [ 'defined', 'subarg' ];
    b.require(files);
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);

        t.equal(c.require('defined')(undefined, true), true);
        t.equal(c.require('defined')(undefined, false), false);
        t.deepEqual(c.require('subarg')(['-x', '3']), { x: 3, _: [] });
    });
});

test('array require opts', function (t) {
    t.plan(3);
    
    var b = browserify();
    var files = [
        { file: require.resolve('defined'), expose: 'abc' },
        { file: require.resolve('subarg'), expose: 'def' }
    ];
    b.require(files);
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);

        t.equal(c.require('abc')(undefined, true), true);
        t.equal(c.require('abc')(undefined, false), false);
        t.deepEqual(c.require('def')(['-x', '3']), { x: 3, _: [] });
    });
});

test('array external', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/external/main.js');
    b.external(['util','freelist']);
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        vm.runInNewContext(
            'function require (x) {'
            + 'if (x==="freelist") return function (n) { return n + 1000 }'
            + '}'
            + src,
            { t: t }
        );
    });
});
