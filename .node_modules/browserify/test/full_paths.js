var unpack = require('browser-unpack');
var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');
var path = require('path');

var deps = [
    path.join(__dirname, '/entry/main.js'),
    path.join(__dirname, '/entry/one.js'),
    path.join(__dirname, '/entry/two.js')
];

test('fullPaths enabled', function (t) {
    t.plan(3);

    var b = browserify({
        entries: [ deps[0] ],
        fullPaths: true
    });

    b.bundle(function (err, src) {
        unpack(src).forEach(function(dep) {
            t.notEqual(deps.indexOf(dep.id), -1, 'full path name for dep.id');
        });
    });
});

test('fullPaths disabled', function (t) {
    t.plan(3);

    var b = browserify({
        entries: [ deps[0] ],
        fullPaths: false
    });

    b.bundle(function (err, src) {
        unpack(src).forEach(function(dep) {
            t.equal(deps.indexOf(dep.id), -1, 'full path name no longer available');
        });
    });
});

test('fullPaths enabled, with custom exposed dependency name', function (t) {
    t.plan(1);

    var b = browserify({
        entries: [__dirname + '/entry/needs_three.js'],
        fullPaths: true
    });

    b.require(__dirname + '/entry/three.js', { expose: 'three' });

    b.bundle(function (err, src) {
        t.doesNotThrow(function () {
            vm.runInNewContext(src, { console: console, t: t });
        });
    });
});
